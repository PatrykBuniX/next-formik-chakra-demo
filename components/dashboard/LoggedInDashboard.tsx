import { useState, useEffect } from "react";
import { VStack, Text, Button, UnorderedList, ListItem } from "@chakra-ui/react";
import jwt from "jsonwebtoken";
import { getBooks } from "../../api/getBooks";
import type { Book } from "../../types";

type Props = {
  accessToken: string;
  logout: () => void;
};

type UserInfo = {
  email: string;
  role: "admin" | "member";
};

export const LoggedInDashboard = ({ accessToken, logout }: Props) => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [booksError, setBooksError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setUserData(null);
      return;
    }
    const data = jwt.verify(accessToken, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!) as UserInfo;
    setUserData(data);
  }, [accessToken]);

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data.books);
    };
    fetchBooks();
  }, []);

  if (!userData) return <p>loading...</p>;

  return (
    <VStack>
      <Text>
        Your are logged in as: {userData.email} ({userData.role})
      </Text>
      <Button onClick={handleClick}>logout</Button>
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
    </VStack>
  );
};
