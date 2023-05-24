import { type ValidationError } from 'yup'

export const getPreparedErrorsFromYup = (e: ValidationError) => e.inner.reduce((acc, el) => {
  acc[el.path] = el.errors.join(', ')
  return acc
}, {})
