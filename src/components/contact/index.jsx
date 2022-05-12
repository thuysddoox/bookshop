import { HomeFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import React from 'react';
import FormContact from '../../components/Form/contact';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 ">
      <div className="w-11/12 sm:w-9/12 mx-auto">
        <InformationCard />
      </div>
      <div className="w-11/12 sm:w-2/3 md:w-1/2 mx-auto">
        <FormContact />
      </div>
    </div>
  );
};
const InformationWrapper = styled.div`
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  .aspect-ratio-custom {
    padding-top: 36% !important;
  }
  .hover:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 675px) {
    .aspect-ratio-custom {
      padding-top: 56.25% !important;
    }
    &.mb-flex-col {
      flex-direction: column !important;
    }
    .mb-w-full {
      width: 100% !important;
    }
    .mb-p-0 {
      padding: 0 !important;
    }
    .mb-mt-6 {
      margin-top: 1.5rem !important;
    }
    .mb-mb-6 {
      margin-bottom: 1.5rem !important;
    }
    .mb-mx-0 {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
`;
const InformationCard = ({
  title,
  address,
  mobile,
  email,
}) => {
  return (
    <InformationWrapper className="p-6 sm:p-8 lg:p-10 flex flex-row mb-flex-col items-start justify-between my-12 mx-4 mb-mx-0 ">
      <div
        className={`mb-w-full w-3/5 rounded-lg`}
      >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3050668733404!2d105.78563351744384!3d20.980405000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1652069094267!5m2!1svi!2s" width="100%" height="300" />
      </div>
      <div
        className={`mb-mt-6 order-1 pl-6 md:pl-8 xl:pl-10' mb-p-0 mb-w-full w-2/5`}
      >
        <h3 className="font-medium text-lg md:text-xl lg:text-2xl uppercase leading-8 text-black-main ml-3">
          BookStore
        </h3>
        <ul className="contact mt-3 md:mt-5">
          <li className="py-1 md:py-2">
            <a className="flex justify-start items-center" rel="noreferrer">
              <HomeFilled />
              <span className="text-base text-black-main ml-3 transition-all">
                96A Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội, Việt Nam
              </span>
            </a>
          </li>
          <li className="cursor-pointer py-1 md:py-2">
            <a
              href={`tell:`}
              className="flex justify-start items-center"
            >
              <PhoneOutlined />
              <span className="text-base text-black-main ml-3 transition-all hover">
                +123 456 789
              </span>
            </a>
          </li>
          <li className="cursor-pointer py-1 md:py-2">
            <a
              href={`mailto:`}
              className="flex justify-start items-center"
            >
              <MailOutlined />
              <span className="text-base text-black-main ml-3 transition-all hover">
                bookstore@gmail.com
              </span>
            </a>
          </li>
        </ul>
      </div>
    </InformationWrapper>
  );
};
export default Contact;
