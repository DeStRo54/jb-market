export const getQueryKeysByParams = (params?: Record<string, unknown>) => {
  return [...(params ? [params] : [])] as const;
};
