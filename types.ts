export type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
};

export type SignInFormValues = {
  email: string;
  password: string;
};

export type Book = {
  author: string;
  country: string;
  language: string;
  pages: number;
  title: string;
  year: number;
};

export type User = {
  email: string;
  role: "admin" | "member";
  firstName: string;
  lastName: string;
};
