import * as yup from "yup";

const email = yup.string().email("Email must be a valid email");
const password = yup.string().required("Password is required");
const confirmPassword = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords do not match");

export const SignInValidationSchema = yup.object().shape({
  email: email,
  password: password,
});

export const SignUpValidationSchema = yup.object().shape({
  email: email,
  password: password,
  confirmPassword: confirmPassword,
});
