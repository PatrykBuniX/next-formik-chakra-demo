import { Formik, Form, FormikValues, FormikErrors } from "formik";
import { Button, SimpleGrid, GridItem } from "@chakra-ui/react";

import { TextField } from "../form-fields/TextField";
import { CheckboxField } from "../form-fields/CheckboxField";

import type { SignUpFormValues } from "../../types";

export const SignUpForm = () => {
  function validateForm(values: FormikValues) {
    const errors: FormikErrors<SignUpFormValues> = {};
    if (!values.name) {
      errors.name = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.termsAndConditions) {
      errors.termsAndConditions =
        "You have to accept terms and conditions if you want to create an account.";
    }
    return errors;
  }

  const colSpanSize = { base: 2, md: 1 };

  return (
    <Formik
      validate={validateForm}
      initialValues={{
        name: "",
        lastName: "",
        email: "",
        password: "",
        termsAndConditions: false,
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
            <GridItem colSpan={colSpanSize}>
              <TextField name="name" labelText="First name" placeholder="John" />
            </GridItem>
            <GridItem colSpan={colSpanSize}>
              <TextField name="lastName" labelText="Last name" placeholder="Doe" />
            </GridItem>
            <GridItem colSpan={2}>
              <TextField name="email" labelText="Email" placeholder="johndoe@gmail.com" />
            </GridItem>
            <GridItem colSpan={2}>
              <TextField type="password" name="password" labelText="Password" />
            </GridItem>
            <GridItem colSpan={2}>
              <CheckboxField
                name="termsAndConditions"
                labelText="I accept all terms and conditions."
              />
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
