import type { SignInFormValues } from "../types";

export async function register(body: SignInFormValues) {
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
