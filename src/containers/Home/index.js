import { Layout, Row } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import BookItem from '../BookItem'
import './Home.css'


const { Content } = Layout

function Home() {

    const[books, setBooks] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('https://bookstore-api.thangld-dev.tech/api/book?fbclid=IwAR1lceXTKx8XlXvUNAcF8AZSD175F7cf8kL9Usk9okMnvzsJddSFrebSFsk')
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
                                key={book._id} 
                                id={book._id}
                                name={book.title}
                                img={book.image}
                                author={book.author.name}
                                category={book.category.type}
                                publisher={book.publisher.name}
                                language={book.language}
                                number_of_pages={book.number_of_pages}
                            />
                        ))}
                    </Row>
                </div>
            </Content>
        </div>
    )
};

export default Home