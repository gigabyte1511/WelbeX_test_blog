import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
})

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
})
