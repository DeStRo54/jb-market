import { Loader2Icon } from "lucide-react";

import { I18nText } from "@/components/common/I18nText";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { useTimer } from "@/utils/hooks/useTimer";

interface CountdownProps {
  loading?: boolean;
  retryAt: number;
  onRetry: () => void;
}

export const Countdown = ({
  retryAt,
  onRetry,
  loading = false,
}: CountdownProps) => {
  // eslint-disable-next-line react-hooks/purity
  const timer = useTimer(Math.floor((retryAt - Date.now()) / 1000));
  const seconds = timer.seconds + timer.minutes * 60;

  if (!seconds)
    return (
      <Button
        className="w-full"
        size="lg"
        type="button"
        variant="secondary"
        onClick={onRetry}
      >
        {loading && <Loader2Icon className="animate-spin" />}
        <I18nText path="button.retryOtp" />
      </Button>
    );

  return (
    <Typography as="p" variant="caption">
      <I18nText path="page.login.otp.retryCountdown" values={{ seconds }} />
    </Typography>
  );
};
