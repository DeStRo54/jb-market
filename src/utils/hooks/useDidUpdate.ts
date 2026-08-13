import type { DependencyList, EffectCallback } from "react";
import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useDidUpdate = (effect: EffectCallback, deps?: DependencyList) => {
  const mountedRef = useRef(false);

  useIsomorphicLayoutEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  useIsomorphicLayoutEffect(() => {
    if (mountedRef.current) {
      return effect();
    }

    mountedRef.current = true;
    return undefined;
  }, deps);
};
