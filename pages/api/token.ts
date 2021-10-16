import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client";
import { createAccessToken } from "../../utils/jwt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "You are not logged in!" });
  }

  const foundToken = prisma.refreshToken.findUnique({ where: { token } });

  if (!foundToken) {
    return res.status(403).json({ message: "Given refresh token does not exist in database." });
  }

  jwt.verify(token, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Not valid refresh token." });
    }

    if (user) {
      const accessToken = createAccessToken(user.email);

      res.json({
        accessToken,
      });
    }
  });
}
