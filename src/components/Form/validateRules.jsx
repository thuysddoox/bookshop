export default function validate(values) {
  const errors = {};
  if (values.name.length === 0 || !values.name)
    errors.name = 'Please enter your name.';
  else if (/[0-9]+/.test(values.name))
    errors.name = 'Name cannot contain numbers.';

  if (values.email.length === 0 || !values.email)
    errors.email = 'Please enter your email.';
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = 'Email Address is invalid.';

  if (values.phone.length === 0 || !values.phone)
    errors.phone = 'Please enter your phone number.';
  else if (/[a-zA-Z]+/.test(values.phone))
    errors.phone = 'Phone number must has only digits.';
  else if (!/[0-9]{10}/.test(values.phone))
    errors.phone = 'Phone number must has 10 digits.';
  if (values.message.length === 0 || !values.message)
    errors.message = 'Please enter your message.';

  return errors;
}