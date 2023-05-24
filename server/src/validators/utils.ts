import { type ValidationError } from 'yup'

export const getPreparedErrorsFromYup = (e: ValidationError): unknown => e.inner.reduce((acc, el) => {
  acc[el.path] = el.errors.join(', ')
  return acc
}, {})
