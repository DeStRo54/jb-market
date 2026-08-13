import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { usePostOtpMutation } from "@/api/hooks/usePostOtpMutation";
import { usePostSignInMutation } from "@/api/hooks/usePostSignInMutation";
import { useUser } from "@/app/_contexts/user/useUser";

import {
  otpFormScheme,
  OtpFormSchemeType,
  phoneFormScheme,
  PhoneFormSchemeType,
} from "../schemas";

export type Stage = "phone" | "otp";

export const useLoginView = () => {
  const [stage, setStage] = useState<Stage>("phone");

  const postOtpMutation = usePostOtpMutation();
  const postLogInMutation = usePostSignInMutation();
  const user = useUser();
  const router = useRouter();

  const isCodeStep = stage === "otp";

  const loginForm = useForm<PhoneFormSchemeType | OtpFormSchemeType>({
    defaultValues: {
      phone: "",
      otp: "",
    },
    resolver: zodResolver(isCodeStep ? otpFormScheme : phoneFormScheme),
  });

  const [submittedPhones, setSubmittedPhones] = useState<
    Record<string, number>
  >({});

  const isLoading = postOtpMutation.isPending || postLogInMutation.isPending;
  const isRetrying = isCodeStep && postOtpMutation.isPending;
  /* eslint-disable-next-line react-hooks/incompatible-library */
  const phone = loginForm.watch("phone");
  const submittedPhone = submittedPhones[phone];

  const onBack = () => {
    loginForm.resetField("otp");
    loginForm.clearErrors("otp");
    setStage("phone");
  };

  const sendOtp = (phone: string) =>
    postOtpMutation.mutate(
      {
        params: {
          phone,
        },
      },
      {
        onSuccess: (postOtpResponse) => {
          setSubmittedPhones((prev) => ({
            ...prev,
            [phone]: Date.now() + postOtpResponse.data.retryDelay,
          }));
          loginForm.reset(
            { phone, otp: "" },
            {
              keepIsSubmitted: false,
              keepSubmitCount: false,
            },
          );
          setStage("otp");
        },
      },
    );

  const onRetry = () => {
    loginForm.resetField("otp");
    loginForm.clearErrors("otp");
    sendOtp(phone);
  };

  const onSubmit = loginForm.handleSubmit((values) => {
    if (!isCodeStep) {
      sendOtp(values.phone);
      return;
    }

    if ("otp" in values) {
      postLogInMutation.mutate(
        {
          params: {
            phone: values.phone,
            code: Number(values.otp),
          },
        },
        {
          onSuccess: (postLogInResponse) => {
            user.set(postLogInResponse.data.user);
            router.back();
          },
        },
      );
    }
  });

  return {
    form: loginForm,
    state: {
      isCodeStep,
      isLoading,
      isRetrying,
      submittedPhone,
    },
    functions: {
      onBack,
      onRetry,
      onSubmit,
    },
  };
};
