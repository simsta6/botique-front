import * as yup from "yup";

export const commentSchema = yup.object().shape({
  comment: yup.string().required(),
  rating: yup.number().required().min(0).max(5),
});
