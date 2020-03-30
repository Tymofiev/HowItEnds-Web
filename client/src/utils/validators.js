const required = (value) => (value ? undefined : 'Required')

const minLength = (minLength) => (value) =>
  value && value.length < minLength ? `Must be at least ${minLength} symbols` : undefined
const minLength5 = minLength(5)
const minLength2 = minLength(2)

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const match = (value) => (valueConfirm) =>
  valueConfirm && value !== valueConfirm ? 'Passwords don`t match' : undefined

export { required, email, minLength5, minLength2, composeValidators, match }
