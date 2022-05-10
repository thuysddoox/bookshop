import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';
import booksApi from '../../network/api/booksApi';

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
	const [book, setBook] = useState();
	const [count, setCount] = useState(1);
	const [total, setTotal] = useState(book?.price ?? 0);
	const history = useNavigate();

	const increase = () => {
		setCount(prev => prev + 1);
	};
	const decrease = () => {
		setCount(prev => (prev > 1 ? prev - 1 : prev));
	};
	const handleBack = () => {
		history(-1);
	};
	useEffect(
		() => {
			setTotal(count * book?.price);
		},
		[count]
	);
	async function getBookDetails(id) {
		booksApi.getDetail(id)
			.then((response) => {
				setBook(response?.data?.data);
			})
			.catch((error) => {
				console.error(error);
			})
	}
	useEffect(() => {
		const path = window.location.pathname;
		const bookId = path.slice(path.lastIndexOf('/') + 1);
		getBookDetails(bookId);
		console.log('agkhsj')
	}, [])
	return (
		<BookDetailWraper className="pt-12 pb-20">
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
						<img src={book?.image} alt="" className="cover h-full w-full" />
					</div>
					<div>
						<h3 className="font-semibold text-xl border-b border-black border-solid pb-2">
							Description
						</h3>
						<div className="mt-4">
							<p><strong>Author:</strong> <span>{book?.author?.name}</span></p>
							<p><strong>Language:</strong> <span>{book?.language}</span></p>
							<p><strong>Number of pages:</strong> <span>{book?.number_of_pages}</span></p>
							<p><strong>Publisher:</strong> <span>{book?.publisher?.name}</span></p>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/3">
					<h3 className="font-bold text-2xl lg:text-3xl text-red">
						{book?.title}
					</h3>
					<div className="rate mt-2">
						<span className="inline-block ml-2 text-gray-200 text-sm">{book?.amount}</span>
					</div>
					<div className="mt-4">
						<span className="text-mb font-medium text-green">Category:</span>
						<span className="text-mb ml-2 italic">{book?.category?.type}</span>
					</div>
					<h4 className="font-semibold text-2xl mt-8">{book?.price} VND</h4>
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
							{total}
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
