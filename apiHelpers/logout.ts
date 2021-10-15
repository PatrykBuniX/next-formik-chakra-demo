export async function logout() {
  const res = await fetch("/api/logout");
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
