import type { NextPage } from "next";
import NextLink from "next/link";
import { Heading, VStack, Text, Link } from "@chakra-ui/react";
import { SignInForm } from "../components/forms/SignInForm";
import { FormView } from "../components/views/FormView";

const SignUp: NextPage = () => {
  return (
    <FormView>
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
    </FormView>
  );
};

export default SignUp;
