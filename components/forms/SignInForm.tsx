import { Formik, Form, FormikValues, FormikErrors } from "formik";
import { Button, SimpleGrid, GridItem } from "@chakra-ui/react";
import { TextField } from "../form-fields/TextField";
import type { SignInFormValues } from "../../types";

export const SignInForm = () => {
  function validateForm(values: FormikValues) {
    const errors: FormikErrors<SignInFormValues> = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  }
  return (
    <Formik
      validate={validateForm}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <TextField name="email" labelText="Email" placeholder="johndoe@gmail.com" />
            </GridItem>
            <GridItem colSpan={2}>
              <TextField type="password" name="password" labelText="Password" />
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
          </SimpleGrid>
        </Form>
      )}
    </Formik>
  );
};
