import type { NextPage } from "next";
import NextLink from "next/link";
import { Container, Heading, VStack, HStack, Button, Text, Link } from "@chakra-ui/react";
import { SignInForm } from "../components/forms/SignInForm";

const SignUp: NextPage = () => {
  const padding = { base: 6, md: 10 };

  return (
    <Container maxW="container.xl" p={0}>
      <VStack w="full" spacing={20} p={padding}>
        <Heading size="2xl">SignIn Form</Heading>
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
            <Heading align="center" size="xl">
              Sign in
            </Heading>
            <Text align="center">
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
