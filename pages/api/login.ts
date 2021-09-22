import type { NextApiRequest, NextApiResponse } from "next";

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
    res.status(200).json({ email: user.email });
  } else {
    res.status(401).json({ message: "Username or password incorrect" });
  }
}
