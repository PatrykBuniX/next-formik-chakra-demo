import type { ReactNode } from "react";
import { Container, VStack, Heading, Button } from "@chakra-ui/react";
import NextLink from "next/link";

type FormViewProps = {
  children: ReactNode;
};

export const FormView = ({ children }: FormViewProps) => {
  const padding = { base: 6, md: 10 };

  return (
    <Container maxW="container.xl" p={0}>
      <VStack w="full" spacing={20} p={padding}>
        <VStack
          bgColor="gray.50"
          boxShadow="md"
          borderRadius="md"
          w="full"
          spacing={10}
          p={padding}
          maxW="700"
        >
          {children}
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
