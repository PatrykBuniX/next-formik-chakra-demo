import type { SignInFormValues } from "../types";

export async function login(body: SignInFormValues) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
