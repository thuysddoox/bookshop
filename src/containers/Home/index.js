import { Layout, Row } from 'antd'
import BookItem from '../BookItem'
import './Home.css'

const { Content } = Layout

function Home() {
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
                        <BookItem 
                            img="../../../images/books/1.png"
                            name="Văn Học"
                            author="Quỳnh Anh"
                        />
                        <BookItem 
                            img="../../../images/books/1.png"
                            name="Văn Học"
                            author="Quỳnh Anh"
                        />
                        <BookItem 
                            img="../../../images/books/1.png"
                            name="Văn Học"
                            author="Quỳnh Anh"
                        />
                        <BookItem 
                            img="../../../images/books/1.png"
                            name="Văn Học"
                            author="Quỳnh Anh"
                        />
                        <BookItem 
                            img="../../../images/books/1.png"
                            name="Văn Học"
                            author="Quỳnh Anh"
                        />
                    </Row>
                </div>
            </Content>
        </div>
    )
};

export default Home