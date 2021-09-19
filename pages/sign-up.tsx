import type { NextPage } from "next";
import NextLink from "next/link";
import { Container, Heading, VStack, HStack, Button, Text, Link } from "@chakra-ui/react";
import { SignUpForm } from "../components/forms/SignUpForm";

const SignUp: NextPage = () => {
  const padding = { base: 6, md: 10 };
  return (
    <Container maxW="container.xl" p={0}>
      <VStack w="full" spacing={20} p={padding}>
        <Heading size="2xl">SignUp Form</Heading>
        <VStack
          bgColor="gray.50"
          boxShadow="md"
          borderRadius="md"
          w="full"
          spacing={10}
          p={padding}
          maxW="700"
        >
          <VStack>
            <Heading size="xl">Create new account</Heading>
            <Text>
              If you already have an account,{" "}
              <NextLink href="/sign-in" passHref>
                <Link fontWeight="700" color="blue.500">
                  click here to log in
                </Link>
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
