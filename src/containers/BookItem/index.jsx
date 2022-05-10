import { Card, Col } from 'antd';
import { useHistory } from 'react-router-dom'

const { Meta } = Card;

function BookItem(props){
    const { id, img, name, author, category, number_of_pages, language, publisher, amount, price } = props
    const history = useHistory()
    const handleOnClickBook = (id) => {
        // console.log('id',id)
        history.push({
            pathname: `/book/${id}`,
            state: {
                img: img,
                category: category,
                name: name,
                author: author,
                number_of_pages: number_of_pages,
                language: language,
                publisher: publisher, 
                price: price,
                amount: amount
            }
        })
    }
    return(
        <Col span={6} onClick={() => handleOnClickBook(id)}>
            <Card
                hoverable
                style={{ marginRight: 20, marginBottom: 20 }}
                cover={<img alt="example" src={img} style={{height: 200}}/>}
            >
                <Meta title={name} description={author} />
            </Card>
        </Col>
    )
}

export default BookItem