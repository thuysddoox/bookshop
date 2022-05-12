import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useForm from './useForm';
import validate from './validateRules';
import emailjs from '@emailjs/browser';
const FormContactWrap = styled.div`
  .bg-custom {
    background: rgba(255, 255, 255, 0.9) !important;
  }
  .z--1 {
    z-index: -1;
  }
  .z-1 {
    z-index: 1;
  }
  .bottom-15 {
    bottom: 15%;
  }
  .btn.cursor-pointer:hover {
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.4);
  }
  .btn.cursor-not-allowed {
    filter: contrast(0.6);
  }

  .image {
    max-width: 450px;
    @media screen and (max-width: 992px) {
      max-width: 350px;
    }
    @media screen and (max-width: 560px) {
      max-width: 250px;
    }
  }
  @media screen and (max-width: 560px) {
    .mb-w-full {
      width: 100% !important;
    }
    .mb-center {
      justify-content: center !important;
    }
  }

  .max-w-500 {
    max-width: 500px;
    text-overflow: ellipsis;
  }
`;

const FormContact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  let statusTimeout = setTimeout(() => { }, 0);
  async function send(data) {
    console.log(data);
    setIsLoading(true);
    emailjs.sendForm('service_cc4c5wk', 'template_wuqql19', form.current, 'O7ipigF2Mkk0b5msT')
      .then((result) => {
        console.log(result.text);
        setIsLoading(false);
        setStatus(200);
        setIsSuccess(true);
        clearForm();
        statusTimeout = setTimeout(() => { setStatus(0) }, 5000)
      }, (error) => {
        setStatus(400);
        setIsLoading(false);
        setIsSuccess(false);
        clearForm();
        statusTimeout = setTimeout(() => { setStatus(0) }, 5000)
      });
  }
  const { handleChange, handleSubmit, clearForm, values, errors } = useForm(validate, send, { email: '', name: '', message: '', });

  useEffect(() => {
    return () => {
      clearTimeout(statusTimeout);
    }
  })

  return (
    <FormContactWrap className="overflow-hidden">
      <p className="font-normal intro text-center text-black-main text-sm sm:text-base leading-6 sm:leading-7 w-8/12 mx-auto mt-10 sm:mt-12 mb-4 sm:mb-6">
        Please fill in the contact information, BookStore will contact and
        answer your questions as soon as possible.
      </p>
      <div className="pt-2 sm:pt-4 relative z-1">
        <form
          ref={form}
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="m-6">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className={`text-blue-900 bg-custom block w-full px-3 py-2 text-sm sm:text-base border border-blue-900 rounded-2xl ${errors?.name ? 'danger' : ''
                }`}
              onChange={handleChange}
              value={values?.name ?? ''}
              required
            />
            {errors?.name && (
              <p className="text-sm pt-2 text-red">{errors?.name}</p>
            )}
          </div>
          <div className="m-6">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className={`text-blue-900 bg-custom block w-full px-3 py-2 text-sm sm:text-base border border-blue-900 rounded-2xl ${errors?.email ? 'danger' : ''
                }`}
              onChange={handleChange}
              value={values?.email ?? ''}
              required
            />
            {errors?.email && (
              <p className="text-sm pt-2 text-red">{errors?.email}</p>
            )}
          </div>
          <div className="m-6">
            <textarea
              placeholder={'Message'}
              name="message"
              style={{ height: '150px' }}
              className={`text-blue-900 bg-custom block w-full px-3 py-2 text-sm sm:text-base border border-blue-900 rounded-xl ${errors?.message ? 'danger' : ''
                }`}
              onChange={handleChange}
              value={values?.message ?? ''}
              required
            />
            {errors?.message && (
              <p className="text-sm pt-2 text-red">{errors?.message}</p>
            )}
          </div>
          <div className="m-6 text-center">
            <input
              type="submit"
              value="Send"
              onClick={handleSubmit}
              className={'cursor-pointer text-white bg-black-main h-10 leading-6 h-11 btn transition-all font-medium inline-block px-10 py-2 text-sm sm:text-base rounded-3xl self-center sm:self-auto'}
            />
          </div>
        </form>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="inline-block rounded-3xl self-center sm:self-auto px-10 py-2">
              <svg
                role="status"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        ) : (
          <></>
        )}
        {status !== 0 ? (isSuccess ? (
          <div className="flex justify-center">
            <div className="inline-flex items-center p-2 rounded-lg shadow-custom">
              <img src={`images/icons/success.gif`} alt="" className="contain h-8 w-8" />
              <p className="ml-2 font-medium text-sm md:text-base">Successfully</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="inline-flex items-center p-2 rounded-lg shadow-custom mx-auto">
              <img src={`images/icons/fail.png`} alt="" className="contain h-8 w-8" />
              <p className="ml-2 font-medium text-sm md:text-base">Error has occured.</p>
            </div>
          </div>
        )) : <></>}
      </div>
    </FormContactWrap>
  );
};
export default FormContact;
