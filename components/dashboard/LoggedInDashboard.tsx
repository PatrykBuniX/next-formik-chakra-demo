import { useState, useEffect } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { getMe } from "../../api/getMe";
import { User } from "../../types";
import { useAuth } from "../../context/AuthContext";

export const LoggedInDashboard = () => {
  const { accessToken, logOutUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setUserData(null);
      return;
    }
    getMe(accessToken).then((data) => setUserData(data.user));
  }, [accessToken]);

  if (!userData) return <p>loading...</p>;

  return (
    <VStack spacing={10}>
      <Text>
        Your are logged in as: {userData.email} ({userData.role})
      </Text>
      <Text>
        {userData.firstName} {userData.lastName}
      </Text>
      <Button onClick={logOutUser}>logout</Button>
    </VStack>
  );
};
