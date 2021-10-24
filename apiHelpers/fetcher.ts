import { getAccessToken, setAccessToken } from "../accessToken";

type Endpoint = "token" | "login" | "logout" | "register" | "delete-account" | "me" | "books";

type Url = `/api/${Endpoint}`;

export async function fetcher(endpoint: Url, payload?: any, withAccessToken?: boolean) {
  const res = await makeRequest(endpoint, payload, withAccessToken);
  const data = await res.json();

  if (!res.ok) {
    if (withAccessToken && data.message.includes("expired")) {
      const tokenRes = await fetch("/api/token");
      const { accessToken } = await tokenRes.json();
      setAccessToken(accessToken);

      const res = await makeRequest(endpoint, payload, withAccessToken);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      return data;
    }
    throw new Error(data.message);
  }
  return data;
}

async function makeRequest(endpoint: Url, payload?: any, withAccessToken?: boolean) {
  const res = await fetch(endpoint, {
    method: payload ? "POST" : "GET",
    body: payload && JSON.stringify(payload),
    headers: withAccessToken ? { Authorization: `Bearer ${getAccessToken()}` } : {},
  });
  return res;
}
