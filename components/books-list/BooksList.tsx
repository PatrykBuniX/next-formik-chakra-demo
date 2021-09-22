import type { Book } from "../../types";
import { UnorderedList, ListItem, Heading, Text, HStack } from "@chakra-ui/react";

type Props = {
  books: Book[];
};

export const BooksList = ({ books }: Props) => {
  if (books.length < 1) return <Text>There are no books in the shelve</Text>;
  return (
    <UnorderedList listStyleType="none" spacing={5}>
      {books.map((book) => (
        <ListItem boxShadow="md" p={5} background="gray.100" borderRadius="md" key={book.title}>
          <Heading fontWeight="bold" size="md">
            {book.title}
          </Heading>
          <Text fontSize="medium" color="gray.500">
            by {book.author} ({book.year})
          </Text>
          <HStack spacing={1} flexWrap="wrap" justifyContent="space-between" mt={3}>
            <Text>{book.language}</Text>
            <Text>{book.pages} pages</Text>
          </HStack>
        </ListItem>
      ))}
    </UnorderedList>
  );
};
