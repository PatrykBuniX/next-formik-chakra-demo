import { Formik, Form, Field, FieldProps, FormikValues, FormikErrors } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  SimpleGrid,
  GridItem,
  Select,
  Checkbox,
} from "@chakra-ui/react";

type FormValues = {
  name: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  termsAndConditions: boolean;
};

export const SignUpForm = () => {
  function validateForm(values: FormikValues) {
    const errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "This field is required";
    }
    if (!values.lastName) {
      errors.lastName = "This field is required";
    }
    if (!values.address) {
      errors.address = "This field is required";
    }
    if (!values.city) {
      errors.city = "This field is required";
    }
    if (!values.country) {
      errors.country = "This field is required";
    }
    if (!values.termsAndConditions) {
      errors.termsAndConditions =
        "You have to accept terms and conditions if you want to create an account.";
    }
    return errors;
  }
  return (
    <Formik
      validate={validateForm}
      initialValues={{
        name: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
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
            <GridItem colSpan={1}>
              <Field name="name">
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={!!form.touched.name && !!form.errors.name}>
                    <FormLabel htmlFor="name">First name</FormLabel>
                    <Input {...field} id="name" placeholder="John" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem colSpan={1}>
              <Field name="lastName">
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={!!form.touched.lastName && !!form.errors.lastName}>
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <Input {...field} id="lastName" placeholder="Doe" />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem colSpan={2}>
              <Field name="address">
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={!!form.touched.address && !!form.errors.address}>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input {...field} id="address" placeholder="Blvd. Broked Dreams 21" />
                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem colSpan={1}>
              <Field name="city">
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={!!form.touched.city && !!form.errors.city}>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input {...field} id="city" placeholder="San Francisco" />
                    <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem colSpan={1}>
              <Field name="country">
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={!!form.touched.country && !!form.errors.country}>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Select {...field} id="country" placeholder="Select country">
                      <option value="usa">United States of America</option>
                      <option value="uae">United Arab Emirates</option>
                      <option value="nmk">North Macedonia</option>
                      <option value="de">Germany</option>
                    </Select>
                    <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem colSpan={2}>
              <Field type="checkbox" name="termsAndConditions">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.touched.termsAndConditions && !!form.errors.termsAndConditions
                    }
                  >
                    <Checkbox defaultChecked={field.checked} {...field} id="country">
                      I accept all terms and conditions.
                    </Checkbox>
                    <FormErrorMessage>{form.errors.termsAndConditions}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
