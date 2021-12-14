import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const registerSchema = yup.object().shape({
  first_name: yup.string().min(5).required(),
  last_name: yup.string().min(5).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
