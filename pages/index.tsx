import type { NextPage } from "next";
import NextLink from "next/link";
import { Container, Heading, VStack, HStack, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

type UserInfo = {
  email: string;
  role: "admin" | "member";
};

const Home: NextPage = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [userData, setUserData] = useState<UserInfo | null>(null);

  const handleClick = () => {
    setAccessToken(null);
  };

  useEffect(() => {
    if (!accessToken) {
      setUserData(null);
      return;
    }
    const data = jwt.verify(accessToken, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!) as UserInfo;
    setUserData(data);
  }, [accessToken]);

  return (
    <Container maxW="container.xl" p={0}>
      <VStack spacing={10} p={10}>
        <Heading size="2xl">Next.js + Formik + Chakra UI</Heading>
        {userData?.email ? (
          <VStack>
            <Text>
              Your are logged in as: {userData.email} ({userData.role})
            </Text>
            <Button onClick={handleClick}>logout</Button>
          </VStack>
        ) : (
          <HStack spacing={10}>
            <NextLink href="/sign-in" passHref>
              <Button as="a" colorScheme="blue" boxShadow="md">
                Sign in
              </Button>
            </NextLink>
            <NextLink href="/sign-up" passHref>
              <Button as="a" colorScheme="gray" boxShadow="md">
                Sign up
              </Button>
            </NextLink>
          </HStack>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
