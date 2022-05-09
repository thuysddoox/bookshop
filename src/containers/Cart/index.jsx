import { Button, Col, Row, Typography } from "antd"
import "./Cart.css"
import CartItem from "./CartItem"

const {Title} = Typography

function Cart(){
    return(
        <div className="cart">
            <Row>
                <Col span={15} className="cart-content">
                    <Title>Giỏ hàng của tôi</Title>
                    <CartItem 
                        img="../../../images/books/1.png"
                        name="Dế Mèn phiêu lưu ký" 
                        price="150.000 VNĐ"
                        category="Văn học"
                        quantity="1"
                        />
                        <CartItem 
                        img="../../../images/books/1.png"
                        name="Dế Mèn phiêu lưu ký" 
                        price="150.000 VNĐ"
                        category="Văn học"
                        quantity="1"
                        />
                </Col>
                <Col span={1}></Col>
                <Col span={8} className="cart-content" style={{height: "100%"}}>
                    <Title>Tổng cộng</Title>
                    <hr style={{paddingBottom: 20}} />
                    <p className="cart-checkout-item">
                        <span className="cart-checkout-item-text">Thành tiền</span>
                        <span>300.000 VNĐ</span>
                    </p>
                    <p className="cart-checkout-item">
                        <span className="cart-checkout-item-text">Phí giao hàng</span>
                        <span>0 VNĐ</span>
                    </p>
                    <hr style={{paddingBottom: 20}} />
                    <Button type="primary" style={{width: "100%"}}>Thanh toán</Button>
                </Col>
                <hr />
            </Row>

        </div>
    )
}

export default Cart