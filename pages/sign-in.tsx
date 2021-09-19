import type { NextPage } from "next";
import NextLink from "next/link";
import { Container, Heading, VStack, HStack, Button, Text, Link } from "@chakra-ui/react";
import { SignInForm } from "../components/forms/SignInForm";

const SignUp: NextPage = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <VStack w="full" spacing={20} p={10}>
        <Heading size="2xl">SignIn Form</Heading>
        <VStack
          bgColor="gray.50"
          boxShadow="md"
          borderRadius="md"
          w="full"
          spacing={10}
          p={10}
          maxW="700"
        >
          <VStack>
            <Heading size="xl">Sign in</Heading>
            <Text>
              If you don&apos;t have an account,{" "}
              <NextLink href="/sign-up" passHref>
                <Link fontWeight="700" color="blue.500">
                  click here to create one
                </Link>
              </NextLink>
              .
            </Text>
          </VStack>
          <SignInForm />
        </VStack>
      </VStack>
      <NextLink href="/" passHref>
        <Button as="a" colorScheme="gray" boxShadow="md">
          Home page
        </Button>
      </NextLink>
    </Container>
  );
};

export default SignUp;
