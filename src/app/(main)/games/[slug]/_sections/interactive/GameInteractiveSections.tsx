"use client";

import { CheckIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import { PatternFormat } from "react-number-format";

import { I18nText } from "@/components/common/I18nText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { Typography } from "@/components/ui/Typography";
import { GameDetailed } from "@/generated/api";
import { cn } from "@/lib/tailwind";
import { PAYMENT_METHODS } from "@/utils/constants/payment";
import { formatMoney } from "@/utils/helpers/formatMoney";
import { formatPhoneNumber } from "@/utils/helpers/formatPhoneNumber";
import { getAsset } from "@/utils/helpers/getAsset";

import { DELIVERY_TYPE_VIEW } from "../../constants/delivery";
import { useGameSelection } from "./hooks/useGetSelection";

interface GameInteractiveSectionsProps {
  game: GameDetailed;
}

export const GameInteractiveSections = ({
  game,
}: GameInteractiveSectionsProps) => {
  const { state, functions, form } = useGameSelection(game);
  const intl = useIntl();

  return (
    <>
      <section
        className={cn(
          "flex flex-col gap-6 [grid-area:selection] lg:gap-4 mb-6 sm:mb-0",
        )}
      >
        <div className="flex flex-col gap-3">
          <Typography variant="title-md" className="hidden md:block">
            <I18nText path="page.gameProduct.deliveryTypeTitle" />
          </Typography>
          <Typography variant="body-md" className="block md:hidden">
            <I18nText path="page.gameProduct.deliveryTypeTitle" />
          </Typography>
          <div
            className={cn(
              "flex flex-col gap-2",
              state.isSelectionLoading && "opacity-100",
            )}
          >
            {game.deliveryTypes.map((deliveryType) => {
              const option = DELIVERY_TYPE_VIEW[deliveryType];
              const Icon = option.Icon;

              return (
                <Button
                  key={deliveryType}
                  className="h-auto w-full justify-start rounded-24! bg-secondary p-4 text-left whitespace-normal hover:bg-secondary-hover/40 disabled:opacity-70"
                  disabled={state.isSelectionLoading}
                  size="lg"
                  type="button"
                  variant="secondary"
                  onClick={() => functions.onDeliveryTypeChange(deliveryType)}
                >
                  <Icon className="size-8" />
                  <span className="flex flex-1 flex-col">
                    <Typography variant="body-sm">
                      <I18nText path={option.titlePath} />
                    </Typography>
                    <Typography className="text-muted-fg" variant="caption">
                      <I18nText path={option.subtitlePath} />
                    </Typography>
                  </span>
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full bg-background",
                      state.selectedDeliveryType === deliveryType &&
                        "border-primary bg-primary text-primary-fg",
                    )}
                  >
                    {state.selectedDeliveryType === deliveryType && (
                      <CheckIcon className="size-4" />
                    )}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Typography variant="title-md" className="hidden md:block">
            <I18nText
              path="page.gameProduct.regionTitle"
              values={{
                platform:
                  DELIVERY_TYPE_VIEW[state.selectedDeliveryType].platform,
              }}
            />
          </Typography>
          <Typography variant="body-md" className="block md:hidden">
            <I18nText
              path="page.gameProduct.regionTitle"
              values={{
                platform:
                  DELIVERY_TYPE_VIEW[state.selectedDeliveryType].platform,
              }}
            />
          </Typography>
          <div
            className={cn(
              "flex flex-wrap gap-2",
              state.isSelectionLoading && "opacity-100",
            )}
          >
            {state.isSelectionLoading && (
              <div className="flex gap-2 w-full">
                {Array.from({ length: 3 }, (_, item) => (
                  <Skeleton
                    key={item}
                    className="h-10 w-full rounded-full bg-secondary"
                  />
                ))}
              </div>
            )}
            {!state.isSelectionLoading &&
              state.regions.map((region) => (
                <Button
                  key={region}
                  className={cn(
                    "bg-secondary text-foreground hover:bg-secondary-hover/50 disabled:opacity-70",
                    state.selectedRegion === region &&
                      "bg-primary text-primary-fg hover:bg-primary/90",
                  )}
                  disabled={state.isSelectionLoading}
                  size="md"
                  type="button"
                  variant="secondary"
                  onClick={() => functions.onRegionChange(region)}
                >
                  <I18nText path={`region.${region}`} />
                </Button>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Typography variant="title-md" className="hidden md:block">
            <I18nText path="page.gameProduct.editionTitle" />
          </Typography>
          <Typography variant="body-md" className="block md:hidden">
            <I18nText path="page.gameProduct.editionTitle" />
          </Typography>
          <div
            className={cn(
              "flex flex-col gap-2",
              state.isSelectionLoading && "opacity-100",
            )}
          >
            {state.isSelectionLoading && (
              <div className="flex gap-2 mt-1.5">
                <Skeleton className="h-4.5 w-full rounded-24 bg-neutral-300" />
                <Skeleton className="h-4.5 w-15 rounded-24 bg-neutral-300" />
              </div>
            )}
            {!state.isSelectionLoading &&
              state.editions.map((edition) => (
                <Button
                  key={edition}
                  className="h-auto w-full justify-start rounded-16 bg-transparent px-0 py-1 text-left hover:bg-transparent disabled:opacity-70"
                  disabled={state.isSelectionLoading}
                  type="button"
                  variant="ghost"
                  onClick={() => functions.onEditionChange(edition)}
                >
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full bg-background",
                      state.selectedPriceVariant.edition === edition &&
                        "bg-primary text-primary-fg",
                    )}
                  >
                    {state.selectedPriceVariant.edition === edition && (
                      <CheckIcon className="size-4" />
                    )}
                  </span>
                  <Typography as="span" variant="caption">
                    {edition}
                  </Typography>
                </Button>
              ))}
          </div>
        </div>
      </section>

      <section>
        <form className="flex flex-col gap-4" onSubmit={functions.onSubmit}>
          <div className="flex gap-3">
            <div className="aspect-square size-14 overflow-hidden rounded-8 relative">
              <Image
                fill
                sizes="56px"
                loading="eager"
                alt={game.name}
                className="object-cover"
                src={getAsset(game.image)}
              />
            </div>
            <div className="flex-1">
              <Typography as="p" className="truncate" variant="body-md">
                {game.name}
              </Typography>
              {state.isSelectionLoading && (
                <Skeleton className="h-4.5 mt-1.5 w-full rounded-24 bg-neutral-300" />
              )}
              {!state.isSelectionLoading && (
                <Typography
                  as="p"
                  className="truncate text-muted-fg"
                  variant="caption"
                >
                  {state.selectedPriceVariant.edition}
                </Typography>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 px-1">
            {state.isSelectionLoading && (
              <>
                <Skeleton className="h-8.5 w-36 rounded-full bg-secondary" />
                <Skeleton className="h-8.5 w-30 rounded-full bg-secondary" />
              </>
            )}
            {!state.isSelectionLoading && (
              <>
                <Badge className="bg-secondary px-4 py-2 text-[12px]/4">
                  <I18nText path="card.order.region" />{" "}
                  <I18nText path={`region.${state.selectedRegion}`} />
                </Badge>
                <Badge className="bg-secondary px-4 py-2 text-[12px]/4">
                  <I18nText
                    path={
                      DELIVERY_TYPE_VIEW[state.selectedDeliveryType].titlePath
                    }
                  />
                </Badge>
              </>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {state.isInviteLinkAvailable && (
              <Controller
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      placeholder={intl.formatMessage({
                        id: "field.product.inviteLink.placeholder",
                      })}
                      className="bg-background"
                      id={field.name}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
                control={form.control}
                name="inviteLink"
              />
            )}
            <Controller
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-[14px]/[22px] font-medium text-foreground"
                    htmlFor={field.name}
                  >
                    <I18nText path="field.product.email.label" />
                  </FieldLabel>
                  <Input
                    {...field}
                    className="bg-background"
                    id={field.name}
                    placeholder={intl.formatMessage({
                      id: "field.product.email.placeholder",
                    })}
                    type="email"
                    autoComplete="email"
                  />
                  {fieldState.error?.message && (
                    <FieldError>
                      <I18nText
                        path={fieldState.error.message as LocaleMessageId}
                      />
                    </FieldError>
                  )}
                </Field>
              )}
              control={form.control}
              name="email"
            />
            <Controller
              render={({
                field: { value, onChange, ...fieldProps },
                fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-[14px]/[22px] font-medium text-foreground"
                    htmlFor={fieldProps.name}
                  >
                    <I18nText path="field.product.phone.label" />
                  </FieldLabel>
                  <PatternFormat
                    {...fieldProps}
                    customInput={Input}
                    format="+7 (###) ### ## ##"
                    value={value.substring(1)}
                    onChange={(e) =>
                      onChange(formatPhoneNumber(e.target.value))
                    }
                    className="bg-background"
                    id={fieldProps.name}
                    placeholder="+7"
                    type="tel"
                    autoComplete="tel"
                  />
                  {fieldState.error?.message && (
                    <FieldError>
                      <I18nText
                        path={fieldState.error.message as LocaleMessageId}
                      />
                    </FieldError>
                  )}
                </Field>
              )}
              control={form.control}
              name="phone"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="p" variant="body-md">
              <I18nText path="page.gameProduct.paymentMethodTitle" />
            </Typography>
            <Controller
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method}
                      className="relative flex min-h-20 items-start gap-2 overflow-hidden rounded-16 bg-background p-4 text-left transition"
                      type="button"
                      onClick={() => field.onChange(method)}
                    >
                      <span className="flex flex-1 flex-col gap-1">
                        <span className="w-fit rounded-full bg-primary px-3 py-0.5 font-pixelify-sans text-[20px]/5 font-bold tracking-wide text-primary-fg">
                          {method === "qr" ? "QR" : "card"}
                        </span>
                        <Typography as="p" variant="body-sm">
                          <I18nText path={`paymentMethod.${method}`} />
                        </Typography>
                      </span>
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full bg-background",
                          field.value === method &&
                            "border-primary bg-primary text-primary-fg",
                        )}
                      >
                        {field.value === method && (
                          <CheckIcon className="size-4" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              control={form.control}
              name="paymentMethod"
            />
          </div>

          <div className="rounded-16 bg-background p-3">
            <div className="flex items-center justify-between gap-4">
              <Typography as="p" variant="body-sm">
                <I18nText path="page.gameProduct.totalLabel" />
              </Typography>
              {state.isSelectionLoading && (
                <Skeleton className="h-8 w-30 rounded-24 bg-neutral-300" />
              )}
              {!state.isSelectionLoading && (
                <Typography as="span" variant="body-lg">
                  {formatMoney(state.selectedPriceVariant.price)}
                </Typography>
              )}
            </div>
          </div>
          {form.formState.errors.root?.message && (
            <Typography as="p" className="text-destructive" variant="caption">
              {form.formState.errors.root.message}
            </Typography>
          )}
          <Button
            className="h-13 w-full"
            disabled={state.isPaymentStarting}
            type="submit"
          >
            {state.isPaymentStarting && (
              <Loader2Icon className="animate-spin" />
            )}
            <I18nText path="button.pay" />
          </Button>
        </form>
      </section>
    </>
  );
};
