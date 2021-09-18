import type { NextPage } from "next";
import NextLink from "next/link";
import { Container, Heading, VStack, HStack, Button, Text, Link } from "@chakra-ui/react";
import { SignUpForm } from "../components/forms/SignUpForm";

const SignUp: NextPage = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <VStack w="full" spacing={20} p={10}>
        <Heading size="2xl">SignUp Form</Heading>
        <VStack
          bgColor="gray.50"
          boxShadow="md"
          borderRadius="md"
          w="full"
          spacing={10}
          p={10}
          maxW="700"
        >
          <VStack alignItems="flex-start">
            <Heading size="xl">Create new account</Heading>
            <Text>
              If you already have an account,{" "}
              <NextLink href="/" passHref>
                <Link colorScheme="blue">click here to log in</Link>
              </NextLink>
              .
            </Text>
          </VStack>
          <SignUpForm />
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
