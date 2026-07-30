import { useState } from "react";

/** The use disclosure options type */
export interface UseDisclosureOptions {
  /** The callback function to be invoked on close */
  onClose?: () => void;
  /** The callback function to be invoked on open */
  onOpen?: () => void;
}

/** The use disclosure return type */
export interface UseDisclosureReturn {
  /** The opened value */
  opened: boolean;
  /** Function to close the modal */
  close: () => void;
  /** Function to open the modal */
  open: () => void;
  /** Function to toggle the modal */
  toggle: (value?: boolean) => void;
}

export const useDisclosure = (
  initialValue = false,
  options?: UseDisclosureOptions,
): UseDisclosureReturn => {
  const [opened, setOpened] = useState(initialValue);

  const open = () =>
    setOpened((opened) => {
      if (!opened) {
        options?.onOpen?.();
        return true;
      }
      return opened;
    });

  const close = () =>
    setOpened((opened) => {
      if (opened) {
        options?.onClose?.();
        return false;
      }
      return opened;
    });

  const toggle = (value = !opened) => (value ? open() : close());

  return { opened, open, close, toggle };
};
