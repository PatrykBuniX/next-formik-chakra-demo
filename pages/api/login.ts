import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { prisma } from "../../prisma/client";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = JSON.parse(req.body);

  const user = await prisma.user.findFirst({ where: { email, password } });
  if (user) {
    const accessToken = createAccessToken(user.email);
    const refreshToken = createRefreshToken(user.email);

    await prisma.refreshToken.create({ data: { token: refreshToken } });

    const expireDate = new Date(Date.now() + 1000 * 60 * 60); //60 mins from now

    res.setHeader(
      "Set-Cookie",
      serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: expireDate,
      })
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Username or password incorrect." });
  }
}
