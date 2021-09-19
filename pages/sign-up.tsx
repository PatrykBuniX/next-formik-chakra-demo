import type { NextPage } from "next";
import NextLink from "next/link";
import { Heading, VStack, Text, Link } from "@chakra-ui/react";
import { SignUpForm } from "../components/forms/SignUpForm";
import { FormView } from "../components/views/FormView";

const SignUp: NextPage = () => {
  return (
    <FormView>
      <VStack>
        <Heading align="center" size="xl">
          Create new account
        </Heading>
        <Text align="center">
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
    </FormView>
  );
};

export default SignUp;
