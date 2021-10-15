import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      if (user) {
        await prisma.user.delete({ where: { email: user.email } });
        res.status(200).send(true);
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
}
