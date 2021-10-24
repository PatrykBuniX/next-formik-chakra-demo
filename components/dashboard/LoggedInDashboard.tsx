import { useState, useEffect } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { getMe } from "../../apiHelpers/getMe";
import { getBooks } from "../../apiHelpers/getBooks";
import { User, Book } from "../../types";
import { deleteAccount } from "../../apiHelpers/deleteAccount";
import { logout } from "../../apiHelpers/logout";
import { BooksList } from "../books-list/BooksList";
import { setAccessToken, getAccessToken } from "../../accessToken";
import { useRouter } from "next/router";

export const LoggedInDashboard = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!getAccessToken()) {
      setUserData(null);
      return;
    }
    getMe(getAccessToken())
      .then((data) => setUserData(data.user))
      .catch(console.log);
  }, []);

  const handleAccountDelete = async () => {
    if (!getAccessToken()) return;
    try {
      await deleteAccount(getAccessToken());
      await logout();
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
    getBooks(getAccessToken())
      .then(({ books }) => setBooks(books))
      .catch(console.log);
  };

  const handleLogoutClick = async () => {
    await logout();
    setAccessToken("");
    router.push("/");
  };

  if (!userData) return <p>No user info</p>;

  return (
    <VStack spacing={10}>
      <Text>
        Your are logged in as: {userData.email} ({userData.role})
      </Text>
      <Text>
        {userData.firstName} {userData.lastName}
      </Text>
      <Button onClick={handleLogoutClick}>Logout</Button>
      <Button colorScheme="red" onClick={handleAccountDelete}>
        Delete account
      </Button>
      <BooksList books={books} />
      <Button colorScheme="blue" onClick={handleBooksLoad}>
        Load books
      </Button>
    </VStack>
  );
};
