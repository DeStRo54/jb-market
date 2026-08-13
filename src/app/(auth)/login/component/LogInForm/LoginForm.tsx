"use client";

import { ChevronLeftIcon, Loader2Icon } from "lucide-react";
import { Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import { PatternFormat } from "react-number-format";

import { HomeLogo } from "@/components/common/HomeLogo";
import { I18nText } from "@/components/common/I18nText";
import { Button } from "@/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/tailwind";
import { formatPhoneNumber } from "@/utils/helpers/formatPhoneNumber";

import { Countdown } from "./component/Countdown";
import { useLoginView } from "./hooks/useLogInView";

export const LoginForm = () => {
  const { form, state, functions } = useLoginView();
  const intl = useIntl();

  return (
    <section className="min-h-dvh px-4 sm:grid sm:place-items-center sm:px-6 sm:py-12">
      <div className="flex w-full flex-col sm:max-w-85 sm:gap-12">
        {/* <div className="hidden text-center text-[16px]/6 font-extrabold sm:block"> */}
        <HomeLogo />
        {/* </div> */}
        <form
          className="flex flex-col gap-6 sm:gap-4"
          onSubmit={functions.onSubmit}
        >
          <div className="flex flex-col gap-6 sm:gap-5">
            <div className="flex flex-col gap-6 sm:gap-5">
              {state.isCodeStep ? (
                <div className="flex items-center gap-6 py-3 sm:py-0">
                  <IconButton
                    rounded
                    className="size-6"
                    disabled={state.isLoading}
                    size="sm"
                    type="button"
                    variant="ghost"
                    onClick={functions.onBack}
                  >
                    <ChevronLeftIcon className="size-6" />
                  </IconButton>
                  <Typography as="h1" variant="title-md">
                    <I18nText path="page.login.otp.title" />
                  </Typography>
                </div>
              ) : (
                <div className="py-3 sm:py-0">
                  <Typography
                    as="h1"
                    className="sm:text-center"
                    variant="title-md"
                  >
                    <I18nText path="page.login.phone.title" />
                  </Typography>
                </div>
              )}
              <Typography as="p" className="tracking-normal" variant="body-sm">
                <I18nText
                  path={`page.login.${state.isCodeStep ? "otp" : "phone"}.description`}
                />
              </Typography>
            </div>
            <fieldset className="pb-2" disabled={state.isLoading}>
              {!state.isCodeStep && (
                <Controller
                  render={({
                    field: { value, onChange, ...fieldProps },
                    fieldState,
                  }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="sr-only" htmlFor={fieldProps.name}>
                        <I18nText path="field.login.phone.label" />
                      </FieldLabel>
                      <PatternFormat
                        {...fieldProps}
                        customInput={Input}
                        format="+7 (###) ### ## ##"
                        value={value.substring(1)}
                        onChange={(e) =>
                          onChange(formatPhoneNumber(e.target.value))
                        }
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
              )}

              {state.isCodeStep && (
                <Controller
                  render={({
                    field: { onChange, ...fieldProps },
                    fieldState,
                  }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="sr-only" htmlFor={fieldProps.name}>
                        <I18nText path="field.login.otp.label" />
                      </FieldLabel>
                      <PatternFormat
                        {...fieldProps}
                        customInput={Input}
                        format="########"
                        onValueChange={(values) => onChange(values.value)}
                        id={fieldProps.name}
                        placeholder={intl.formatMessage({
                          id: "field.login.otp.placeholder",
                        })}
                        autoComplete="one-time-code"
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
                  name="otp"
                />
              )}
            </fieldset>
          </div>
          <div
            className={cn(
              "flex flex-col gap-2.5 py-4 sm:py-0",
              state.isCodeStep && "pb-0",
            )}
          >
            <Button disabled={state.isLoading} size="lg" type="submit">
              {state.isLoading && <Loader2Icon className="animate-spin" />}
              <I18nText
                path={state.isCodeStep ? "button.login" : "button.submitPhone"}
              />
            </Button>
            {state.isCodeStep && state.submittedPhone && (
              <Countdown
                loading={state.isRetrying}
                retryAt={state.submittedPhone}
                onRetry={functions.onRetry}
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
