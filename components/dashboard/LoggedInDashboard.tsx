import { useState, useEffect } from "react";
import { VStack, Text, Button, UnorderedList, ListItem } from "@chakra-ui/react";
import jwt from "jsonwebtoken";
import { getBooks } from "../../api/getBooks";
import type { Book } from "../../types";
import { BooksList } from "../books-list/BooksList";

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
    jwt.verify(accessToken, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET!, (err, user) => {
      if (err) {
        console.log(err);
      }
      const { email, role } = user as UserInfo;
      setUserData({ email, role });
    });
  }, [accessToken]);

  const handleLogoutClick = () => {
    logout();
  };

  const handleBooksFetch = async () => {
    try {
      const data = await getBooks(accessToken);
      setBooks(data.books);
      setBooksError(null);
    } catch (err) {
      if (err instanceof Error) {
        setBooksError(err.message);
        setBooks([]);
      }
    }
  };

  if (!userData) return <p>loading...</p>;

  return (
    <VStack spacing={10}>
      <Text>
        Your are logged in as: {userData.email} ({userData.role})
      </Text>
      <Button onClick={handleLogoutClick}>logout</Button>
      {booksError && <Text color="red.200">{booksError}</Text>}
      <BooksList books={books} />
      <Button onClick={handleBooksFetch}>fetch books</Button>
    </VStack>
  );
};
