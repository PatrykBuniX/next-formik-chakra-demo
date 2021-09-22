import { HStack, Button } from "@chakra-ui/react";
import NextLink from "next/link";

export const LoggedOutDashboard = () => {
  return (
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
  );
};
