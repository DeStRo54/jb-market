"use client";

import { CircleQuestionMarkIcon, Loader2Icon, LogOutIcon } from "lucide-react";
import { useState } from "react";

import { usePostSignOutMutation } from "@/api/hooks/usePostSignOutMutation";
import { useUser } from "@/app/_contexts/user/useUser";
import { I18nText } from "@/components/common/I18nText";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export const SignoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const postLogOutMutation = usePostSignOutMutation();
  const user = useUser();

  const postLogOut = async () => {
    const postLogOutResponse = await postLogOutMutation
      .mutateAsync({})
      .catch(() => null);

    if (postLogOutResponse?.data.success) {
      user.set(null);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <I18nText path="button.logout.confirm" />
        <LogOutIcon />
      </Button>
      {showModal && (
        <Modal
          onOpenChange={setShowModal}
          icon={<CircleQuestionMarkIcon width={56} height={56} />}
          title={<I18nText path="modal.logout.title" />}
        >
          <div className="flex flex-col gap-2 sm:gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowModal(false)}
            >
              <I18nText path="button.logout.cancel" />
            </Button>
            <Button
              size="lg"
              onClick={postLogOut}
              disabled={postLogOutMutation.isPending}
            >
              {postLogOutMutation.isPending && (
                <Loader2Icon className="animate-spin" />
              )}
              <I18nText path="button.logout.confirm" />
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
