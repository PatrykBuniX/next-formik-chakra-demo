import { Field } from "formik";
import type { FieldProps } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

import type { SignUpFormValues } from "../../types";

type TextFieldProps = {
  name: keyof SignUpFormValues;
  labelText: string;
  placeholder?: string;
  type?: string;
};

export const TextField = ({ name, labelText, placeholder, type }: TextFieldProps) => {
  return (
    <Field type={type} name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={!!form.touched[name] && !!form.errors[name]}>
          <FormLabel id={`label-for-${name}`} htmlFor={name}>
            {labelText}
          </FormLabel>
          <Input {...field} type={type} id={name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
