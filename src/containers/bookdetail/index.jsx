import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BookDetailWraper = styled.div`
  .rate svg {
    height: 15px !important;
    path {
      fill: var(--color-yellow) !important;
    }
  }
  svg.add {
    height: 18px;
    path {
      fill: black !important;
    }
  }
  .slick-track {
    display: flex;
    align-items: center;

    /* max-height: 450px; */
  }
  .slide-big .slick-track {
    background: rgba(255, 255, 255, 0.3);
  }
  .slide-small .slick-slide.slick-current {
    opacity: 0.5;
  }
  .slick-arrow.slick-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .slick-prev {
    left: -15px !important;
  }
  .slick-next {
    right: -15px !important;
  }
  .add-btn:hover {
    background: var(--color-red) !important;
    transition: all 0.3s linear !important;
  }
  .decrement,
  .increment {
    &:hover {
      background: #f1f1f1d6 !important;
      transition: all 0.3s linear;
    }
  }
  .back:hover {
    margin-left: -20px;
    transition: all 0.3 linear;
  }
`;
const BookDetail = () => {
	const [count, setCount] = useState(1);
	const [total, setTotal] = useState(85.3);
	const history = useHistory();
	const increase = () => {
		setCount(prev => prev + 1);
	};
	const decrease = () => {
		setCount(prev => (prev > 1 ? prev - 1 : prev));
	};
	const handleBack = () => {
		history.goBack();
	};
	useEffect(
		() => {
			setTotal(count * 85.3);
		},
		[count]
	);
	return (
		<BookDetailWraper className="pt-24 sm:pt-28 md:pt-36 pb-20">
			<div className="flex justify-between flex-wrap my-20 md:w-11/12 xl:w-4/5 mx-auto px-5">
				<div className="w-full sm:w-2/3 sm:pr-6 lg:pr-12">
					<div
						className="flex items-center justify-start cursor-pointer mb-6 back transition-all"
						onClick={handleBack}
					>
						<ArrowLeftOutlined />
						<span className="text-black ml-4 text-lg font-medium">Back</span>
					</div>
					<div className="mb-20">
						<img src="../../../images/books/1.png" alt="" className="cover h-full w-full" />
					</div>
					<div>
						<h3 className="font-semibold text-xl border-b border-black border-solid pb-2">
							Description
						</h3>
						<div className="mt-4">Lorem ipsum dolor</div>
					</div>
				</div>
				<div className="w-full sm:w-1/3">
					<h3 className="font-bold text-2xl lg:text-3xl text-red">
						Name Book
					</h3>
					<div className="rate mt-2">
						<span className="inline-block ml-2 text-gray-200 text-sm">100</span>
					</div>
					<div className="mt-4">
						<span className="text-mb font-medium text-green">Category:</span>
						<span className="text-mb ml-2 italic">Kĩ năng</span>
					</div>
					<h4 className="font-semibold text-2xl mt-8">$85.30</h4>
					<div className="flex justify-center my-4">
						<button
							className="inline-block w-1/3 py-3 px-4 bg-gray-200 text-black cursor-pointer font-medium decrement"
							onClick={decrease}
						>
							-
						</button>
						<span className="inline-block w-1/3 py-3 px-4 bg-white border border-gray-300 text-black text-center text-lg font-medium">
							{count}
						</span>
						<button
							className="inline-block w-1/3 py-3 px-4 bg-gray-200 text-black cursor-pointer font-medium increment"
							onClick={increase}
						>
							+
						</button>
					</div>
					<div className="flex justify-between py-2">
						<span className="font-semibold text-base">Subtotal</span>
						<span className="font-semibold text-base">
							${total.toFixed(2)}
						</span>
					</div>
					<div className="flex justify-center items-center mx-auto bg-green my-3 cursor-pointer py-3 px-3 border border-green add-btn">
						<span className="text-white font-medium text-mb">Add to cart</span>
					</div>
				</div>
			</div>
		</BookDetailWraper>
	);
};
export default BookDetail;
