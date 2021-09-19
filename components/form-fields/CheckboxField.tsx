import { Field } from "formik";
import type { FieldProps } from "formik";
import { FormControl, FormErrorMessage, Checkbox } from "@chakra-ui/react";

type CheckboxFieldProps = {
  name: string;
  labelText: string;
};

export const CheckboxField = ({ name, labelText }: CheckboxFieldProps) => {
  return (
    <Field type="checkbox" name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={!!form.touched[name] && !!form.errors[name]}>
          <Checkbox defaultChecked={field.checked} {...field} id={name}>
            {labelText}
          </Checkbox>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
