export async function getAccessToken() {
  const res = await fetch("/api/token", {});
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
