import fetches from "@/lib/fetches";

export const api = fetches.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") return config;
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  );

  config.headers!.cookie = cookieStore
    .getAll()
    .map(
      (cookie) =>
        `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`,
    )
    .join("; ");

  return config;
});
