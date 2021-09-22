import { useState, useEffect } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import jwt from "jsonwebtoken";

type Props = {
  accessToken: string;
  logout: () => void;
};

type UserInfo = {
  email: string;
  role: "admin" | "member";
};

export const LoggedInDashboard = ({ accessToken, logout }: Props) => {
  const [userData, setUserData] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setUserData(null);
      return;
    }
    const data = jwt.verify(accessToken, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!) as UserInfo;
    setUserData(data);
  }, [accessToken]);
  const handleClick = () => {
    logout();
  };

  if (!userData) return <p>loading...</p>;

  return (
    <VStack>
      <Text>
        Your are logged in as: {userData.email} ({userData.role})
      </Text>
      <Button onClick={handleClick}>logout</Button>
    </VStack>
  );
};
