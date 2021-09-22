import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const books = [
  {
    author: "Chinua Achebe",
    country: "Nigeria",
    language: "English",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958,
  },
  {
    author: "Hans Christian Andersen",
    country: "Denmark",
    language: "Danish",
    pages: 784,
    title: "Fairy tales",
    year: 1836,
  },
  {
    author: "Dante Alighieri",
    country: "Italy",
    language: "Italian",
    pages: 928,
    title: "The Divine Comedy",
    year: 1315,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, (err) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      res.status(200).json({ books });
    });
  } else {
    res.status(401);
  }
}
