import type { Book } from "../../types";
import { UnorderedList, ListItem, Text } from "@chakra-ui/react";

type Props = {
  books: Book[];
};

export const BooksList = ({ books }: Props) => {
  if (books.length < 1) return <Text>There are no books in the shelve</Text>;
  return (
    <UnorderedList>
      {books.map((book) => (
        <ListItem key={book.title}>
          <Text>
            {book.author} - {book.title} ({book.language})
          </Text>
          <Text>
            {book.year}, {book.pages} pages
          </Text>
        </ListItem>
      ))}
    </UnorderedList>
  );
};
