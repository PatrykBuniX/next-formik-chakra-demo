import type { ReactNode } from "react";
import { Container, VStack } from "@chakra-ui/react";

type DashbordViewProps = {
  children: ReactNode;
};

export const DashbordView = ({ children }: DashbordViewProps) => {
  const padding = { base: 6, md: 10 };

  return (
    <Container maxW="container.xl" p={0}>
      <VStack>
        <VStack w="full" spacing={20} p={padding}>
          {children}
        </VStack>
      </VStack>
    </Container>
  );
};
