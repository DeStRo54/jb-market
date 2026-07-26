import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    input: {
      target: "./api.yaml",
    },
    output: {
      target: "./generated/api/schemas.ts",
      schemas: "./generated/api",
      mode: "split",
      client: "zod",
      clean: true,
    },
  },
});
