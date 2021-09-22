import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Username or password incorrect" });
  }
}
