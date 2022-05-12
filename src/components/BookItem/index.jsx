import { Card, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom'

const { Meta } = Card;

function BookItem(props) {
    const { id, img, name, author, category, number_of_pages, language, publisher, amount, price } = props
    const history = useNavigate()
    return (
        <Col span={6} >
            <Link to={`/book/${id}`} >
                <Card
                    hoverable
                    style={{ marginRight: 20, marginBottom: 20 }}
                    cover={<img alt="example" src={img} style={{ height: 240 }} className="object-contain py-4" />}
                >
                    <Meta title={name} description={author} />
                </Card>
            </Link>
        </Col>
    )
}

export default BookItem