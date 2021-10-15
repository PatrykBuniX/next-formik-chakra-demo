import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../apiHelpers/register";
import { Formik, Form, FormikValues, FormikErrors, FormikHelpers } from "formik";
import { Button, SimpleGrid, GridItem, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { TextField } from "../form-fields/TextField";
import { CheckboxField } from "../form-fields/CheckboxField";
import type { SignUpFormValues } from "../../types";

export const SignUpForm = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const router = useRouter();
  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  const handleSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      const data = await register(values);
      setAccessToken(data.accessToken);
      setRegisterError(null);
    } catch (err) {
      if (err instanceof Error) {
        setRegisterError(err.message);
      }
    }
    actions.setSubmitting(false);
  };

  const colSpanSize = { base: 2, md: 1 };

  return (
    <Formik
      validate={validateForm}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        termsAndConditions: false,
      }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={colSpanSize}>
              <TextField name="firstName" labelText="First name" placeholder="John" />
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
            <GridItem colSpan={2}>
              <FormControl isInvalid={!!registerError}>
                <FormErrorMessage>{registerError}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </Form>
      )}
    </Formik>
  );
};

function validateForm(values: FormikValues) {
  const errors: FormikErrors<SignUpFormValues> = {};
  if (!values.firstName) {
    errors.firstName = "First name is required";
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
