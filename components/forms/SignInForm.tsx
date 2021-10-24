import { useEffect, useState } from "react";
import { Formik, Form, FormikValues, FormikErrors, FormikHelpers } from "formik";
import { Button, SimpleGrid, GridItem, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { TextField } from "../form-fields/TextField";
import type { SignInFormValues } from "../../types";
import { login } from "../../apiHelpers/login";
import { useRouter } from "next/router";
import { getAccessToken, setAccessToken } from "../../accessToken";

export const SignInForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken()) {
      router.push("/");
    }
  });

  const handleSubmit = async (
    values: SignInFormValues,
    actions: FormikHelpers<SignInFormValues>
  ) => {
    try {
      const data = await login(values);
      setAccessToken(data.accessToken);
      setLoginError(null);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      validate={validateForm}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
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
            <GridItem colSpan={2}>
              <FormControl isInvalid={!!loginError}>
                <FormErrorMessage>{loginError}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </Form>
      )}
    </Formik>
  );
};

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
