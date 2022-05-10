import React, { useEffect, useState } from 'react';


const useForm = (validate, callback, dataInit) => {
  const [values, setValues] = useState({...dataInit });
  const [errors, setErrors] = useState({...dataInit });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting && isClick) {
      callback(values);
      setIsSubmitting(false);
      // console.log("success")
    }
    setIsClick(false);
    // console.log(errors)
  }, [errors]);

  useEffect(() => {
    if (isSubmitting) setErrors(validate(values));
    // console.log("validate")
  }, [values]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    setIsClick(true);
    // console.log(validate(values))
  };

  const handleChange = (event) => {
    event.persist();
    if (event.target.files) {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.files[0],
      }));
    } else
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    // console.log(validate(values))
  };
  const clearForm = () => {
    setValues({
      ...dataInit
    });
  };
  return {
    handleChange,
    handleSubmit,
    clearForm,
    values,
    errors,
  };
};

export default useForm;