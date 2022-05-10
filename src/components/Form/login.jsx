
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { login } from '../../network/api/login';
import useForm from './useForm';
import validate from './validateRules';
import { useNavigate } from 'react-router-dom';
const LoginWrapper = styled.div`
  input:focus {
    border-color: var(--color-green) !important;
    outline: none !important;
  }
  .signin-other {
    &:after {
      position: absolute;
      content: '';
      top: 50%;
      left: 0%;
      display: block;
      width: 35%;
      background-color: #3333;
      height: 2px;
    }
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: 0%;
      display: block;
      width: 35%;
      height: 2px;
      background-color: #3333;
    }
  }
  @media screen and (max-width: 768px) {
    .signin-other:after,
    .signin-other:before {
      width: 25%;
    }
  }
  .max-w-500 {
    max-width: 300px;
  }
`;
const LoginForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const history = useNavigate();
  let statusTimeout = setTimeout(() => { }, 0);
  async function send(data) {
    // console.log(data);
    setIsLoading(true);
    login(data)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setStatus(200);
        setIsSuccess(true);
        clearForm();
        localStorage.setItem('access_token', JSON.stringify(response?.data?.access_token));
        localStorage.setItem('logined', "true");
        localStorage.setItem('username', JSON.stringify(response?.data?.user?.username));
        history("/")

      })
      .catch((error) => {
        setIsSuccess(false);
        setIsLoading(false);
        setStatus(400);
        // clearForm();
        statusTimeout = setTimeout(() => { setStatus(0) }, 5000)
      });
  }
  const { handleChange, handleSubmit, clearForm, values, errors } = useForm(validate, send, { username: '', password: '' });

  useEffect(() => {
    return () => {
      // clearTimeout(statusTimeout);
    }
  })
  return (
    <LoginWrapper className="bg-white w-11/12 sm:w-3/5 mx-auto text-green pt-10 pb-14 max-w-md sm:max-w-xl">
      <div>
        <div className="w-10/12 sm:w-4/5 mx-auto">
          <h3 className="text-red font-bold text-3xl sm:text-4xl mb-0 sm:mb-2">
            BookStore
          </h3>
          <h4 className="text-black font-semibold text-xl sm:text-2xl py-2">
            Welcome back to BookStore
          </h4>
          <p className="text-gray-500 font-medium text-mb sm:text-base">
            New here?{' '}
            <a href="/register">
              <span className="text-green underline cursor-pointer">
                Create an account
              </span>
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-10/12 sm:w-4/5 mx-auto pt-4">
          <div className="my-6">
            <label
              htmlFor="username"
              className="text-gray-500 font-medium text-sm block mb-2"
            >
              Username
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={values?.username ?? ''}
              name="username"
              id="username"
              className={`border-2 rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green ${errors?.username ? 'danger' : ''
                }`}
              required
            />
            {errors?.username && (
              <p className="text-sm pt-2 text-red">{errors?.username}</p>
            )}
          </div>
          <div className="my-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-gray-500 font-medium text-sm"
              >
                Password
              </label>
              <span className="text-green text-sm font-medium cursor-pointer">
                Forget password?
              </span>
            </div>
            <input
              type="password"
              onChange={handleChange}
              value={values?.password ?? ''}
              name="password"
              required
              className={`border-2 border-solid rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green ${errors?.password ? 'danger' : ''
                }`}
            />
            {errors?.password && (
              <p className="text-sm pt-2 text-red">{errors?.password}</p>
            )}
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              name=""
              id="remember"
              className="border-2 border-solid rounded-lg border-gray-400 px-2 py-1 "
            />
            <label
              htmlFor="remember"
              className="text-black font-medium text-mb ml-2"
            >
              Remember this device
            </label>
          </div>
          <div className="mb-6">
            <input
              type="submit"
              value="Sign in"
              onClick={handleSubmit}
              className="text-white bg-green block text-center w-full py-2 rounded-lg cursor-pointer"
            />
          </div>
          <div className="mb-6">
            <span className="text-gray-500 text-mb signin-other inline-block relative w-full mx-auto text-center px-2">
              or sign in with
            </span>
          </div>
          <div>
            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full sm:w-1/2">
                <div className="flex items-center border-solid justify-center border-2 border-green py-1 rounded-md cursor-pointer sm:mr-2">
                  <img
                    src={`images/icons/facebook.png`}
                    className="h-7"
                  />
                  <span className="text-green text-mb font-medium ml-2">
                    Facebook
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="flex items-center border-solid justify-center border-2 border-green py-1 rounded-md cursor-pointer mt-4 sm:mt-0 sm:ml-2">
                  <img src={`images/icons/google.png`} className="h-7" />
                  <span className="text-green text-mb font-medium ml-2">
                    Google
                  </span>
                </div>
              </div>
            </div>
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
              <p className="ml-2 font-medium text-sm md:text-base">Username or password is invalid.</p>
            </div>
          </div>
        )) : <></>}
      </div>
    </LoginWrapper >
  );
};

export default LoginForm;
