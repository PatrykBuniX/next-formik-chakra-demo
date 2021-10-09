export async function getMe(accessToken: string) {
  const res = await fetch("/api/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
