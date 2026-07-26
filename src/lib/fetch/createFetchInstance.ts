import {
  ApiClientOptions,
  ApiErrorDetails,
  QueryParams,
  RequestBody,
  RequestOptions,
} from "./types";

export class ApiError extends Error {
  status: number;
  statusText: string;
  data?: unknown;

  constructor({ status, statusText, data }: ApiErrorDetails) {
    super(
      `API request failed with status ${status}${statusText ? ` ${statusText}` : ""}`,
    );
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

function isAbsoluteUrl(path: string) {
  return /^https?:\/\//.test(path);
}

function buildSearchParams(params?: QueryParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams;
}

function buildUrl(path: string, baseUrl: string, params?: QueryParams) {
  const searchParams = buildSearchParams(params);

  if (isAbsoluteUrl(path)) {
    const url = new URL(path);

    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  }

  if (baseUrl) {
    const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const normalizedPath = path.replace(/^\/+/, "");
    const url = new URL(normalizedPath, normalizedBaseUrl);

    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  }

  const search = searchParams.toString();

  return search ? `${path}?${search}` : path;
}

function isBodyInit(body: RequestBody): body is BodyInit {
  return (
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ReadableStream ||
    body instanceof ArrayBuffer
  );
}

function prepareBody(body: RequestBody | null | undefined, headers: Headers) {
  if (body == null) {
    return undefined;
  }

  if (isBodyInit(body)) {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204 || response.status === 205) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return response.text() as T;
}

async function createApiError(response: Response) {
  let data: unknown;

  try {
    data = await parseResponse(response);
  } catch {
    data = undefined;
  }

  return new ApiError({
    status: response.status,
    statusText: response.statusText,
    data,
  });
}

function createRequest(baseUrl: string) {
  return async function request<T>(
    method: string,
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { params, body, headers, ...init } = options;
    const normalizedHeaders = new Headers(headers);
    const response = await fetch(buildUrl(path, baseUrl, params), {
      ...init,
      method,
      headers: normalizedHeaders,
      body: prepareBody(body, normalizedHeaders),
    });

    if (!response.ok) {
      throw await createApiError(response);
    }

    return parseResponse<T>(response);
  };
}

export function createFetchInstance(options: ApiClientOptions) {
  const request = createRequest(options.baseUrl);

  return {
    get<T>(path: string, options?: RequestOptions) {
      return request<T>("GET", path, options);
    },
    post<T>(path: string, body?: RequestBody | null, options?: RequestOptions) {
      return request<T>("POST", path, { ...options, body });
    },
    put<T>(path: string, body?: RequestBody | null, options?: RequestOptions) {
      return request<T>("PUT", path, { ...options, body });
    },
    patch<T>(
      path: string,
      body?: RequestBody | null,
      options?: RequestOptions,
    ) {
      return request<T>("PATCH", path, { ...options, body });
    },
    delete<T>(path: string, options?: RequestOptions) {
      return request<T>("DELETE", path, options);
    },
  };
}
