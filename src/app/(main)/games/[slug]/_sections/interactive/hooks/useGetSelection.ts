import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useQueryStates } from "nuqs";
import { useForm } from "react-hook-form";

import { useGetGamesPriceVariantsQuery } from "@/api/hooks/useGetGamesPriceVariantsQuery";
import { useGetGamesRegionsQuery } from "@/api/hooks/useGetGamesRegionsQuery";
import { usePostGamesOrderMutation } from "@/api/hooks/usePostGamesOrderMutation";
import { GameDeliveryType, GameDetailed, GameRegion } from "@/generated/api";
import { getPaymentServiceUrl } from "@/utils/helpers/payment";

import {
  gameCheckoutFormSchema,
  GameCheckoutFormValues,
} from "../schemas/checkoutForm";
import {
  deliveryParser,
  editionParser,
  regionParser,
} from "../schemas/searchParams";

export const useGameSelection = (game: GameDetailed) => {
  const { slug } = useParams();

  const [searchParams, setSearchParams] = useQueryStates({
    deliveryType: deliveryParser,
    region: regionParser,
    edition: editionParser,
  });

  const slugString = Array.isArray(slug) ? slug[0] : slug;
  const [defaultDeliveryType] = game.deliveryTypes;

  const selectedDeliveryType =
    game &&
    searchParams.deliveryType &&
    game.deliveryTypes.includes(searchParams.deliveryType)
      ? searchParams.deliveryType
      : defaultDeliveryType;

  const getGameRegionsQuery = useGetGamesRegionsQuery(
    {
      slug: slugString ?? "",
      deliveryType: selectedDeliveryType,
    },
    {
      options: {
        enabled: !!game,
      },
    },
  );

  const regions = [
    ...new Set(getGameRegionsQuery.data?.data.regions ?? []),
  ] as GameRegion[]; //из-за бага бекенда

  const [defaultRegion] = regions;
  const selectedRegion =
    searchParams.region && regions.includes(searchParams.region)
      ? searchParams.region
      : defaultRegion;

  const getGamePriceVariantsQuery = useGetGamesPriceVariantsQuery(
    {
      slug: slugString ?? "",
      deliveryType: selectedDeliveryType ?? "steam_key",
      region: selectedRegion,
    },
    {
      options: {
        enabled: !!game && !!selectedRegion,
        placeholderData: keepPreviousData,
      },
    },
  );

  const priceVariants =
    getGamePriceVariantsQuery.data?.data.priceVariants ?? [];
  const [defaultPriceVariant] = priceVariants;
  const selectedPriceVariant =
    priceVariants.find(
      (priceVariant) => priceVariant.edition === searchParams.edition,
    ) ?? defaultPriceVariant;

  const editions = priceVariants.map((variant) => variant.edition);

  const isSelectionLoading =
    getGameRegionsQuery.isFetching || getGamePriceVariantsQuery.isFetching;

  const onDeliveryTypeChange = (newDeliveryType: GameDeliveryType) =>
    setSearchParams({
      deliveryType: newDeliveryType,
    });

  const onRegionChange = (newRegion: GameRegion) =>
    setSearchParams({
      region: newRegion,
    });

  const onEditionChange = (newEdition: string) =>
    setSearchParams({
      edition: newEdition,
    });

  const gameCheckoutForm = useForm<GameCheckoutFormValues>({
    defaultValues: {
      email: "",
      inviteLink: "",
      paymentMethod: "card",
      phone: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(gameCheckoutFormSchema),
  });

  const postGamesOrderMutation = usePostGamesOrderMutation();

  const onSubmit = gameCheckoutForm.handleSubmit(async (values) => {
    gameCheckoutForm.clearErrors("root");

    if (
      !game ||
      !selectedDeliveryType ||
      !selectedRegion ||
      !selectedPriceVariant
    ) {
      gameCheckoutForm.setError("root", {
        message: "Не удалось получить данные для оформления заказа",
      });
      return;
    }

    try {
      const postGamesOrderResponse = await postGamesOrderMutation.mutateAsync({
        params: {
          deliveryType: selectedPriceVariant.deliveryType,
          edition: selectedPriceVariant.edition,
          gameSlug: game.slug,
          person: {
            email: values.email,
            phone: values.phone,
            ...(values.inviteLink && { inviteLink: values.inviteLink }),
          },
          region: selectedPriceVariant.region,
        },
      });

      if (!postGamesOrderResponse.data.success)
        throw new Error(postGamesOrderResponse.data.reason);

      const transactionId =
        postGamesOrderResponse.data.transaction._id ??
        postGamesOrderResponse.data.order.transactionId;

      if (!transactionId) {
        gameCheckoutForm.setError("root", {
          message: "Не удалось получить транзакцию для оплаты",
        });
        return;
      }

      window.location.assign(
        getPaymentServiceUrl({
          backUrl: new URL(
            "https://juniorsbootcamp.ru/payment",
            window.location.origin,
          ).toString(),
          transactionId,
          type: values.paymentMethod,
        }),
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      gameCheckoutForm.setError("root", {
        message: error.message || "Не удалось создать заказ",
      });
      return;
    }
  });

  return {
    state: {
      selectedDeliveryType,
      selectedRegion,
      regions,
      selectedPriceVariant,
      editions,
      isSelectionLoading,
      isPaymentStarting:
        postGamesOrderMutation.isPending ||
        gameCheckoutForm.formState.isSubmitting,
      isInviteLinkAvailable: selectedDeliveryType === "steam_gift",
    },
    functions: {
      onDeliveryTypeChange,
      onRegionChange,
      onEditionChange,
      onSubmit,
    },
    form: gameCheckoutForm,
  } as const;
};
