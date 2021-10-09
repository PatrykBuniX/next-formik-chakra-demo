import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      if (user) {
        const me = await prisma.user.findUnique({ where: { email: user.email } });
        if (!me) {
          return res.status(403).json({ message: "User not found" });
        }
        console.log("me: ", me);
        res.status(200).json({
          user: {
            email: me.email,
            role: me.role,
            firstName: me.firstName,
            lastName: me.lastName,
          },
        });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
}
