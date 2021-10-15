import type { Book } from "../types";

export async function getBooks(accessToken: string): Promise<{ books: Book[] }> {
  const res = await fetch("/api/books", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
