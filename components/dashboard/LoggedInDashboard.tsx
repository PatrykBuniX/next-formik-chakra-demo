import { useState, useEffect } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { getMe } from "../../apiHelpers/getMe";
import { User } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { deleteAccount } from "../../apiHelpers/deleteAccount";

export const LoggedInDashboard = () => {
  const { accessToken, logOutUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setUserData(null);
      return;
    }
    getMe(accessToken)
      .then((data) => setUserData(data.user))
      .catch(console.log);
  }, [accessToken]);

  const handleAccountDelete = async () => {
    if (!accessToken) return;
    try {
      await deleteAccount(accessToken);
      logOutUser();
    } catch (e) {
      console.log(e);
    }
  };

  if (!userData) return <p>No user info</p>;

  return (
    <VStack spacing={10}>
      <Text>
        Your are logged in as: {userData.email} ({userData.role})
      </Text>
      <Text>
        {userData.firstName} {userData.lastName}
      </Text>
      <Button onClick={logOutUser}>logout</Button>
      <Button colorScheme="red" focusBorderColor="lime" onClick={handleAccountDelete}>
        Delete account
      </Button>
    </VStack>
  );
};
