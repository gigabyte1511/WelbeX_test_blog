import * as yup from 'yup'

export const createPostSchema = yup.object({
  previewURL: yup
    .string(),
  // .required(),
  header: yup
    .string(),
  // .required(),
  text: yup
    .string()
  // .required(),
})
