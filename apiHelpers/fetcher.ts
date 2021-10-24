import { getAccessToken } from "../accessToken";

type Endpoint = "token" | "login" | "logout" | "register" | "delete-account" | "me" | "books";

type Url = `/api/${Endpoint}`;

export async function fetcher(endpoint: Url, payload?: any, withAccessToken?: boolean) {
  const res = await fetch(endpoint, {
    method: payload ? "POST" : "GET",
    body: payload && JSON.stringify(payload),
    headers: withAccessToken ? { Authorization: `Bearer ${getAccessToken()}` } : {},
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
