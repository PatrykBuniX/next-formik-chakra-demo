import { useState, useEffect } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { getMe } from "../../apiHelpers/getMe";
import { getBooks } from "../../apiHelpers/getBooks";
import { User, Book } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { deleteAccount } from "../../apiHelpers/deleteAccount";
import { BooksList } from "../books-list/BooksList";

export const LoggedInDashboard = () => {
  const { accessToken, logOutUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!accessToken) {
      setUserData(null);
      return;
    }
    getMe(accessToken)
      .then((data) => setUserData(data.user))
      .catch(console.log);
  }, [accessToken]);

  const handleAccountDelete = async () => {
    if (!accessToken) return;
    try {
      await deleteAccount(accessToken);
      logOutUser();
    } catch (e) {
      console.log(e);
    }
  };

  const handleBooksLoad = async () => {
    if (!accessToken) {
      setBooks([]);
      return;
    }
    getBooks(accessToken)
      .then(({ books }) => setBooks(books))
      .catch(console.log);
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
      <Button onClick={logOutUser}>Logout</Button>
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
