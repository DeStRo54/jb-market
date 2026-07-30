import fetches from "@/lib/fetches";

export const api = fetches.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Credential: "omit",
  },
});
