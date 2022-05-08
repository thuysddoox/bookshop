
import styled from '@emotion/styled';

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
  return (
    <LoginWrapper className="bg-white w-11/12 sm:w-3/5 mx-auto text-green pt-10 pb-14 max-w-md sm:max-w-xl">
      <div>
        <div className="w-10/12 sm:w-4/5 mx-auto">
          <h3 className="text-red font-bold text-3xl sm:text-4xl mb-0 sm:mb-2">
            BookShop
          </h3>
          <h4 className="text-black font-semibold text-xl sm:text-2xl py-2">
            Welcome back to BookShop
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
        <form action="" className="w-10/12 sm:w-4/5 mx-auto pt-4">
          <div className="my-6">
            <label
              htmlFor="email"
              className="text-gray-500 font-medium text-sm block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name=""
              id="email"
              className="border-2 rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green"
              required
            />
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
              name=""
              id="password"
              required
              className="border-2 border-solid rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green"
            />
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
      </div>
    </LoginWrapper>
  );
};

export default LoginForm;
