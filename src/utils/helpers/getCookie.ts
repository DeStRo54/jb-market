export const getCookie = (key: string): string | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const cookies = Object.fromEntries(
    window.document.cookie.split("; ").map((cookie) => {
      const [key, ...value] = cookie.split("=");
      const decodedValue = decodeURIComponent(value.join("="));
      return [key, decodedValue];
    }),
  );

  return cookies[key];
};
