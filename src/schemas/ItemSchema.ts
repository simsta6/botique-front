import * as yup from "yup";

export const itemSchema = yup.object().shape({
  brand: yup.string().required(),
  color: yup.string().required(),
  count: yup.number().required(),
  size: yup.number().required(),
  price: yup.number().required(),
  imageUrl: yup.string().required(),
});
