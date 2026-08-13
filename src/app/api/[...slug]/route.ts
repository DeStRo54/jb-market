import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { COOKIES } from "@/utils/constants/cookies";

async function proxy(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  const backendUrl = "https://juniorsbootcamp.ru";
  const targetUrl = new URL(request.nextUrl.pathname, backendUrl);
  targetUrl.search = searchParams;
  const headers = new Headers(request.headers);

  headers.delete("host");

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIES.SESSION)?.value;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const fetchOptions: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers: headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    fetchOptions.body = request.body;
    fetchOptions.duplex = "half";
  }

  try {
    const response = await fetch(targetUrl, fetchOptions);

    const headers = new Headers(response.headers);
    headers.delete("content-encoding");
    headers.delete("content-length");

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch {
    return new Response(JSON.stringify({ error: "Bad Gateway" }), {
      status: 502,
      headers: { "Content-Type": "appliacation/json" },
    });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
