import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { prisma } from "../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.refreshToken;

  await prisma.refreshToken.delete({ where: { token } });

  const expireDate = new Date(Date.now());

  res.setHeader(
    "Set-Cookie",
    serialize("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: expireDate,
    })
  );

  res.status(200).send(true);
}
