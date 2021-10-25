import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    addBook(req, res);
  } else {
    getBooks(req, res);
  }
}

function addBook(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, async (err) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      const { author, title, country, language, pages, year } = JSON.parse(req.body);
      const book = await prisma.book.create({
        data: { author, title, country, language, pages, year },
      });
      res.status(200).json({ book });
    });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
}

function getBooks(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, async (err) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      const books = await prisma.book.findMany();
      res.status(200).json({ books });
    });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
}
