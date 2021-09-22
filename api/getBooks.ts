import type { Book } from "../types";

export async function getBooks(): Promise<{ books: Book[] }> {
  const res = await fetch("/api/bookes", {});
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
