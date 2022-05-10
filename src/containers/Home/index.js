import { Layout, Row } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import BookItem from '../BookItem'
import './Home.css'
import bookApis from "../../network/api/booksApi"

const { Content } = Layout

function Home() {

    const[books, setBooks] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            //const response = bookApis.getAll()
            const response = await axios.get('https://bookstore-api.thangld-dev.tech/api/itembook')
            setBooks(response.data.data)
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
                    <p className='sub-title'>Nổi bật</p>
                    <Row>
                        {books.map((book, index) => (
                            <BookItem 
                                key={book.book._id} 
                                id={book.book._id}
                                amount={book.amount}
                                price={book.price}
                                name={book.book.title}
                                img={book.book.image}
                                author={book.book.author.name}
                                category={book.book.category.type}
                                publisher={book.book.publisher.name}
                                language={book.book.language}
                                number_of_pages={book.book.number_of_pages}
                            />
                        ))}
                    </Row>
                </div>
            </Content>
        </div>
    )
};

export default Home