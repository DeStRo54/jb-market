/* eslint-disable */

import { useEffect, useRef, useState } from "react";

import { useDebounceCallback } from "./useDebounceCallback";

export const useDebounceValue = <Value>(value: Value, delay: number) => {
  const previousValueRef = useRef(value);
  const [debouncedValue, setDebounceValue] = useState(value);

  const debouncedSetState = useDebounceCallback(setDebounceValue, delay);

  useEffect(() => {
    if (previousValueRef.current === value) return;
    debouncedSetState(value);
    previousValueRef.current = value;
  }, [value]);

  return debouncedValue;
};
