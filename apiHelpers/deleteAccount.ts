export async function deleteAccount(accessToken: string) {
  const res = await fetch("/api/delete-account", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
