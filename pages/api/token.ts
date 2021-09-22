import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const refreshTokens: string[] = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyMzE3OTY1fQ._H32gCi-vMKUDlAEWi0VSz3tWBaPIyvFJselWXgttTI",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyMzE4MDI2fQ.gFckAfVtzYyGmpku4Pa6isNGmk0K-s-LGqdCAy5Foj8",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.refreshToken;
  console.log("refreshToken: ", req.cookies.refreshToken);

  if (!token) {
    return res.status(401).json({ message: "You have to provide refresh token to authenticate!" });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Given refresh token does not exist in database" });
  }

  jwt.verify(token, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Not valid refresh token." });
    }

    if (user) {
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!,
        { expiresIn: "1m" }
      );

      res.json({
        accessToken,
      });
    }
  });
}
