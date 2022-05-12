import { useState } from "react"
import { Row, Col, Image } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import "./CartItem.css"

function CartItem(props) {
    const { img, name, price, category, quantity } = props
    const [count, setCount] = useState(quantity || 1)

    const increase = () => {
        setCount(prev => prev + 1);
    };
    const decrease = () => {
        setCount(prev => (prev > 1 ? prev - 1 : prev));
    };


    return (
        <div style={{ marginBottom: 20, marginTop: 20 }}>
            <hr style={{ marginBottom: 20, marginTop: 10 }} />
            <Row>
                <Col span={6}>
                    <Image height={'100%'} src={img}></Image>
                </Col>
                <Col span={17} className="cart-item-content">
                    <p className="cart-item-price">{price / quantity} VNĐ</p>
                    <p className="cart-item-name">{name}</p>
                    <p>Thể loại: {category}</p>
                    <div className="group-btn-quantity">
                        <div className="w-full sm:w-1/3">
                            <div className="flex justify-center my-4">
                                <button
                                    className="inline-block w-1/3 py-3 px-4 bg-gray-200 text-black cursor-pointer font-medium decrement"
                                    onClick={decrease}
                                >
                                    -
                                </button>
                                <span className="quantity-item inline-block w-1/3 py-3 px-4 bg-white border border-gray-300 text-black text-center text-lg font-medium">
                                    {count}
                                </span>
                                <button
                                    className="inline-block w-1/3 py-3 px-4 bg-gray-200 text-black cursor-pointer font-medium increment"
                                    onClick={increase}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={1} onClick={() => props.delete(props.index)}><CloseOutlined /></Col>
            </Row>

        </div>

    )
}

export default CartItem