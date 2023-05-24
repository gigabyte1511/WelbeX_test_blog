import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
  username: yup
    .string('Поле должно быть строкой')
    .required('Поле обязательно для заполнения'),
  email: yup
    .string('Поле должно быть строкой')
    .email('Поле содержит невалидный email-адрес')
    .required('Поле обязательно для заполнения'),
  password: yup
    .string('Поле должно быть строкой')
    .required('Поле обязательно для заполнения')
})

export const signInSchema = yup.object().shape({
  email: yup
    .string('Поле должно быть строкой')
    .email('Поле содержит невалидный email-адрес')
    .required('Поле обязательно для заполнения'),
  password: yup
    .string('Поле должно быть строкой')
    .required('Поле обязательно для заполнения')
})
