import type { Book } from "../types";

export async function getBooks(): Promise<{ books: Book[] }> {
  const res = await fetch("/api/books", {});
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  console.log(data.message);
  return data;
}
