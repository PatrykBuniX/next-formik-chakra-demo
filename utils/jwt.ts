import jwt from "jsonwebtoken";

export const createAccessToken = (email: string) => {
  return jwt.sign({ email }, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, { expiresIn: "15s" });
};

export const createRefreshToken = (email: string) => {
  return jwt.sign({ email }, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!);
};
