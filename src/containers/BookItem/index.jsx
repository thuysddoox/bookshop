import { Card, Col } from 'antd';

const { Meta } = Card;

function BookItem(props){
    const { img, name, author } = props
    return(
        <Col span={6}>
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