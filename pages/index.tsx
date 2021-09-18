import type { NextPage } from "next";
import NextLink from "next/link";
import { Container, Heading, VStack, HStack, Link, Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <VStack spacing={10} p={10}>
        <Heading size="2xl">Next.js + Formik + Chakra UI</Heading>
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
      </VStack>
    </Container>
  );
};

export default Home;
