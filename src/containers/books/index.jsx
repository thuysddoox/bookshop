import { Layout, Row } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import BookItem from '../../components/BookItem'
import './style.css'
import bookApis from "../../network/api/booksApi"
import { useSearchParams } from 'react-router-dom'

const { Content } = Layout

function Books() {

  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      console.log(searchParams.get("keysearch"))
      const response = await bookApis.search(searchParams.get("keysearch"));
      console.log(response)
      setBooks(response?.data?.data ?? [])
    }
    fetchData()
  }, [])


  return (
    <div>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 64,
        }}
      >
        <div
          className="site-layout-background  min-h-screen"
          style={{
            padding: 10,
          }}
        >
          <p className='sub-title'>Kết quả tìm kiếm</p>
          <Row>
            {books?.length ? books.map((book, index) => (
              <BookItem
                key={index}
                id={book._id}
                amount={book.amount}
                price={book.price}
                name={book.book?.title}
                img={book.book?.image}
                author={book.book?.author.name}
                category={book.book?.category.type}
                publisher={book.book?.publisher.name}
                language={book.book?.language}
                number_of_pages={book.book?.number_of_pages}
              />
            )) : <>Không tồn tại sách có tên {`"${searchParams.get("keysearch")}"`}</>}
          </Row>
        </div>
      </Content>
    </div>
  )
};

export default Books