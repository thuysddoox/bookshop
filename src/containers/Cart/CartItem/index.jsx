import { Row, Col, Button, Input, Image } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import "./CartItem.css"

function CartItem(props){
    const {img, name, price, category, quantity} = props
    return(
        <div style={{marginBottom: 20, marginTop: 20}}>
            <hr style={{marginBottom: 20, marginTop: 10}} />
            <Row>
                <Col span={6}>
                    <Image src={img}></Image>
                </Col>
                <Col span={17} className="cart-item-content">
                    <p className="cart-item-price">{price}</p>
                    <p className="cart-item-name">{name}</p>
                    <p>Thể loại: {category}</p>
                    <div className="group-btn-quantity">
                        <Button className="btn-quantity">+</Button>
                        <Input placeholder={quantity} style={{width: 50}} className="btn-quantity"></Input>
                        <Button>-</Button>
                    </div>
                    </Col>
                <Col span={1}><CloseOutlined /></Col>
            </Row>
            
        </div>
        
    )
}

export default CartItem