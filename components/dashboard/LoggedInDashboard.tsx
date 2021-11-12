import { useState, useEffect } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { User, Book } from "../../types";
import { BooksList } from "../books-list/BooksList";
import { setAccessToken, getAccessToken } from "../../accessToken";
import { useRouter } from "next/router";
import { fetcher } from "../../apiHelpers/fetcher";
import { AddBookForm } from "../forms/AddBookForm";

export const LoggedInDashboard = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!getAccessToken()) {
      setUserData(null);
      return;
    }
    fetcher("/api/me", null, true)
      .then((data) => setUserData(data.user))
      .catch(console.log);
  }, []);

  const handleAccountDelete = async () => {
    if (!getAccessToken()) return;
    try {
      await fetcher("/api/delete-account", null, true);
      await fetcher("/api/logout");
      setAccessToken("");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleBooksLoad = async () => {
    if (!getAccessToken()) {
      setBooks([]);
      return;
    }
    fetcher("/api/books", null, true)
      .then(({ books }) => setBooks(books))
      .catch(console.log);
  };

  const handleLogoutClick = async () => {
    await fetcher("/api/logout");
    setAccessToken("");
    router.push("/");
  };

  if (!userData) return <p>No user info</p>;

  return (
    <VStack spacing={10}>
      <Text>
        You are logged in as: {userData.email} ({userData.role})
      </Text>
      <Text>
        {userData.firstName} {userData.lastName}
      </Text>
      <Button onClick={handleLogoutClick}>Logout</Button>
      <Button colorScheme="red" onClick={handleAccountDelete}>
        Delete account
      </Button>
      {userData.role === "admin" && <AddBookForm setBooks={setBooks} />}
      <BooksList books={books} />
      <Button colorScheme="blue" onClick={handleBooksLoad}>
        Load books
      </Button>
    </VStack>
  );
};
