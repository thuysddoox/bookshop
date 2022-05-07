import styled from '@emotion/styled';

const RegisterWrapper = styled.div`
  input:focus {
    border-color: var(--color-green) !important;
    outline: none !important;
  }
  .btn {
    &:hover {
      filter: brightness(1.2);
      transition: all 0.3s linear;
    }
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
const RegisterForm = () => {
  return (
    <RegisterWrapper className="bg-white w-11/12 sm:w-4/5 mx-auto text-green pt-10 pb-14 max-w-4xl">
      <div>
        <div className="w-10/12 mx-auto">
          <h3 className="text-red font-bold text-3xl sm:text-4xl mb-0 sm:mb-2">
            BookShop
          </h3>
          <h4 className="text-black font-semibold text-xl sm:text-2xl py-2">
            Welcome to BookShop
          </h4>
          <p className="text-gray-500 font-medium text-mb sm:text-base">
            Already have an account?{' '}
            <a href="/login">
              <span className="text-green underline cursor-pointer">
                Signin here
              </span>
            </a>
          </p>
        </div>
        <form action="" className="w-10/12 mx-auto pt-6">
          <div className="flex justify-between flex-wrap">
            <div className="w-full sm:w-1/2 my-3 sm:mb-6 sm:mt-0">
              <label
                htmlFor="name"
                className="text-gray-500 font-medium text-sm block mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name=""
                id="name"
                className="border-2 border-solid rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 pl-0 sm:pl-6 xl:pl-8 my-3 sm:mb-6 sm:mt-0">
              <label
                htmlFor="username"
                className="text-gray-500 font-medium text-sm block mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name=""
                id="username"
                className="border-2 rounded-lg border-solid border-gray-400 px-2 py-1 inline-block w-full text-green"
                required
              />
            </div>
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="w-full sm:w-1/2 my-3 sm:mb-6 sm:mt-0 ">
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
            <div className="w-full sm:w-1/2 pl-0 sm:pl-6 xl:pl-8 my-3 sm:mb-6 sm:mt-0">
              <label
                htmlFor="phone"
                className="text-gray-500 font-medium text-sm block mb-2"
              >
                Phone
              </label>
              <input
                type="phone"
                name=""
                id="phone"
                className="border-2 rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green"
                required
              />
            </div>
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="w-full sm:w-1/2 my-3 sm:mt-0 sm:mb-8 ">
              <label
                htmlFor="password"
                className="text-gray-500 font-medium text-sm block mb-2"
              >
                Password
              </label>

              <input
                type="password"
                name=""
                id="password"
                required
                className="border-2 rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green"
              />
            </div>
            <div className="w-full sm:w-1/2 pl-0 sm:pl-6 xl:pl-8 mt-3 mb-6 sm:mt-0 sm:mb-8 ">
              <label
                htmlFor="repassword"
                className="text-gray-500 font-medium text-sm block mb-2"
              >
                Confirm Password
              </label>

              <input
                type="password"
                name=""
                id="repassword"
                required
                className="border-2 rounded-lg border-gray-400 px-2 py-1 inline-block w-full text-green"
              />
            </div>
          </div>

          <div className="mb-8 py-2 flex items-center">
            <input
              type="checkbox"
              name=""
              id="remember"
              className="border-2 rounded-lg border-gray-400 px-2 py-1 "
            />
            <label
              htmlFor="remember"
              className="text-black font-medium text-mb ml-3"
            >
              I agree to the restaurant&apos;s{' '}
              <span className="text-green">Terms And Conditions</span> and{' '}
              <span className="text-green">Privacy Policies</span>.
            </label>
          </div>
          <div className="mb-8">
            <input
              type="submit"
              value="Sign up"
              className="btn bg-green block text-center text-white w-full sm:w-3/5 mx-auto py-2 rounded-lg cursor-pointer"
            />
          </div>
          <div className="mb-8">
            <span className="text-gray-500 text-mb signin-other inline-block relative w-full mx-auto text-center px-2">
              or sign up with
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
    </RegisterWrapper>
  );
};

export default RegisterForm;
