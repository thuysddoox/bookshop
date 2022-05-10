export default function validate(values) {
  const errors = {};
  if (values['username'] != undefined && values?.username?.length === 0)
    errors.username = 'Please enter your username.';

  if (values['password'] != undefined && values?.password?.length === 0)
    errors.password = 'Please enter your password.';

  if (values['repassword'] != undefined && values?.repassword?.length === 0)
    errors.repassword = 'Please enter your password.';
  else if (values['password'] != undefined && values['repassword'] != undefined && values?.repassword !== values?.password)
    errors.repassword = 'Repassword not match password.';

  if (values['fullname'] != undefined && values?.fullname?.length === 0)
    errors.fullname = 'Please enter your name.';
  else if (/[0-9]+/.test(values.fullname))
    errors.fullname = 'Name cannot contain numbers.';
  if (values['name'] != undefined && values?.name?.length === 0)
    errors.name = 'Please enter your name.';
  else if (/[0-9]+/.test(values.name))
    errors.name = 'Name cannot contain numbers.';

  if (values['email'] != undefined && values?.email?.length === 0)
    errors.email = 'Please enter your email.';
  else if (!/\S+@\S+\.\S+/.test(values.email) && values.email)
    errors.email = 'Email Address is invalid.';

  if (values['telephone'] != undefined && values?.telephone?.length === 0)
    errors.telephone = 'Please enter your phone number.';
  else if (/[a-zA-Z]+/.test(values.telephone) && values.telephone)
    errors.telephone = 'Phone number must has only digits.';
  else if (!/[0-9]{10}/.test(values.telephone) && values.telephone)
    errors.telephone = 'Phone number must has 10 digits.';

  if (values['message'] != undefined && values?.message?.length === 0)
    errors.message = 'Please enter your message.';

  return errors;
}