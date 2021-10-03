import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { prisma } from "../../prisma/client";

const users = [
  {
    email: "test@gmail.com",
    password: "123",
    role: "admin",
  },
  {
    email: "anna@gmail.com",
    password: "123",
    role: "member",
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = JSON.parse(req.body);
  const user = users.find((u) => {
    return u.email === email && u.password === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!
    );

    await prisma.refreshToken.create({ data: { token: refreshToken } });

    const expireDate = new Date(Date.now() + 1000 * 60 * 5);

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
    res.status(401).json({ message: "Username or password incorrect" });
  }
}
