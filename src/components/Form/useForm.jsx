import React, { useEffect, useState } from 'react';


const useForm = (validate, callback) => {
  const [isSubmitting, setIsSubmitting] = useState < boolean > (false);
  const [values, setValues] = useState({
    phone: '',
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    phone: '',
    name: '',
    email: '',
    message: '',
  });
  useEffect(() => {
    if (Object.keys(errors).length === 0) callback(values);
  }, [errors]);

  useEffect(() => {
    if (isSubmitting) setErrors(validate(values));
  }, [values]);

  const handleChange = (event) => {
    event.persist();
    setValues((prev) => ({...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  return {
    values,
    errors,
    handleSubmit,
    handleChange,
  };
};

export default useForm;