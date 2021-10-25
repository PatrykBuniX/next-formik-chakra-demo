import { Dispatch, SetStateAction, useState } from "react";
import { Formik, Form, FormikValues, FormikErrors, FormikHelpers } from "formik";
import {
  Button,
  SimpleGrid,
  GridItem,
  FormControl,
  FormErrorMessage,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { TextField } from "../form-fields/TextField";
import type { AddBookFormValues, Book } from "../../types";
import { fetcher } from "../../apiHelpers/fetcher";

type Props = {
  setBooks: Dispatch<SetStateAction<Book[]>>;
};

export const AddBookForm = ({ setBooks }: Props) => {
  const [addBookError, setAddBookError] = useState<string | null>(null);

  const handleSubmit = async (
    values: AddBookFormValues,
    actions: FormikHelpers<AddBookFormValues>
  ) => {
    try {
      const { book } = await fetcher("/api/books", values, true);
      setBooks((prevState) => [...prevState, book]);
      setAddBookError(null);
    } catch (err) {
      if (err instanceof Error) {
        setAddBookError(err.message);
      }
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <VStack>
      <Heading>Add new book</Heading>
      <Formik
        validate={validateForm}
        initialValues={{
          author: "",
          title: "",
          country: "",
          language: "",
          pages: "",
          year: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem colSpan={1}>
                <TextField name="author" labelText="Author" placeholder="David Goggins" />
              </GridItem>
              <GridItem colSpan={1}>
                <TextField name="title" labelText="Title" placeholder="Can't Hurt Me" />
              </GridItem>
              <GridItem colSpan={1}>
                <TextField name="country" labelText="Country" placeholder="USA" />
              </GridItem>
              <GridItem colSpan={1}>
                <TextField name="language" labelText="Language" placeholder="English" />
              </GridItem>
              <GridItem colSpan={1}>
                <TextField type="number" name="pages" labelText="Pages" placeholder="308" />
              </GridItem>
              <GridItem colSpan={1}>
                <TextField type="number" name="year" labelText="Year" placeholder="2007" />
              </GridItem>
              <GridItem colSpan={2}>
                <Button
                  w="full"
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  isDisabled={!(props.isValid && props.dirty)}
                  type="submit"
                >
                  Submit
                </Button>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isInvalid={!!addBookError}>
                  <FormErrorMessage>{addBookError}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

function validateForm(values: FormikValues) {
  const errors: FormikErrors<AddBookFormValues> = {};
  if (!values.author) {
    errors.author = "Author is required";
  }
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.country) {
    errors.country = "Country is required";
  }
  if (!values.language) {
    errors.language = "Language is required";
  }
  if (!values.pages) {
    errors.pages = "Pages is required";
  }
  if (!values.year) {
    errors.year = "Year is required";
  }
  return errors;
}
