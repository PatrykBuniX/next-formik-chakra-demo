import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { prisma } from "../../prisma/client";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, firstName, lastName } = JSON.parse(req.body);

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with given email already exists, please log in." });
  }

  await prisma.user.create({
    data: { email, password, firstName, lastName, role: "member" },
  });

  const accessToken = createAccessToken(email);
  const refreshToken = createRefreshToken(email);

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
}
