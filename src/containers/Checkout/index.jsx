import { Col, Row, Form, Input, Select, Checkbox, Button } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import "./Checkout.css"
import { getUser } from "../../network/api/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarts } from "../../network/api/cart";
import { createPayment } from "../../network/api/payment";

const { Option } = Select;

function Checkout() {
    const [user, setUser] = useState();
    const history = useNavigate();
    const [cart, setCart] = useState();
    const [logined] = useState(localStorage.getItem("logined") || false);
    async function LoginJWT() {
        getUser(JSON.parse(localStorage.getItem("access_token")), JSON.parse(localStorage.getItem("username")))
            .then(response => {
                setUser(response?.data?.data?.user)
                // console.log(response)
            })
            .catch(err => {
                console.error(err)
            })
    }
    async function getCart() {
        getCarts(JSON.parse(localStorage.getItem("access_token")), JSON.parse(localStorage.getItem("userId")))
            .then(response => {
                // console.log(response)
                if (response?.data?.carts) {
                    let carts = response?.data?.carts;
                    setCart(response?.data?.carts[response?.data?.carts.findIndex((cart) => cart._id === localStorage.getItem("cartId"))])
                }
            })
            .catch(error => { console.log(error); })
    }
    async function payment() {
        createPayment({ order: localStorage.getItem('orderId') })
            .then(function (response) {
                console.log(response);
                if (response?.data?.url) {
                    window.open(response?.data?.url);
                    history("/profile");
                    window.location.reload();
                }
            }).catch(function (err) {
                console.log(err);
            })
    }
    useEffect(() => {
        if (logined) {
            getCart();
            LoginJWT();
        }
        else history('/login');
    }, [])

    return (
        <Row style={{ paddingTop: 100, paddingBottom: 30 }} className="container mx-auto">
            <Col span={16}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                >
                    <h2 style={{ paddingLeft: 130, paddingBottom: 10, fontSize: 40 }}>Hóa Đơn</h2>
                    <Form.Item
                        label="Họ tên"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy điền tên!',
                            },
                        ]}
                    >
                        <Input value={user?.fullname} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy điền email!',
                            },
                        ]}
                    >
                        <Input value={user?.email} />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy điền số điện tho!',
                            },
                        ]}>
                        <Input value={user?.telephone} />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy điền địa chỉ!',
                            },
                        ]}>
                        <Input value={user?.address?.no_home + " " + user?.address?.street + " " + user?.address?.district} />
                    </Form.Item>
                    <Form.Item
                        label="Thành phố"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy điền thành phố!',
                            },
                        ]}>
                        <Input value={user?.address?.city} />
                    </Form.Item>
                </Form>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                >
                    <h2 style={{ paddingLeft: 130, paddingBottom: 10, fontSize: 40 }}>Thanh toán</h2>
                    <Form.Item name="checkbox-group" style={{ paddingLeft: 100 }}>
                        <Checkbox
                            value="sameAddress"
                            style={{
                                lineHeight: '32px',
                            }}
                        >
                            Địa chỉ thanh toán cùng là địa chỉ giao hàng
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="select"
                        label="Select"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy chọn hình thức thanh toán!',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn hình thức thanh toán">
                            <Option value="off">Thanh toán khi nhận hàng</Option>
                            <Option value="onl-bank">Thanh toán bằng thẻ ngân hàng</Option>
                            <Option value="onl-card">Thanh toán bằng ví điện tử</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}>
                <div className="checkout-cart-detail">
                    <Form
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 24 }}
                        layout="horizontal"
                    >
                        <h2 className="checkout-cart-detail-title">
                            Giỏ hàng
                            <span className="cart-number">
                                <ShoppingCartOutlined style={{ paddingRight: 10 }} />
                                <b>{cart?.item_book.length}</b>
                            </span>
                        </h2>
                        {
                            cart?.item_book.map((item, id) => (
                                <div key={id} className="border-b border-green border-solid p-2 flex items-center">
                                    <span className="w-1/3 inline-block">{item?.book?.title}</span>
                                    <span className="w-2/3 inline-block">{item?.quantity} * {item?.price} = {item?.quantity * item?.price} VNĐ</span>
                                </div>
                            ))
                        }
                        <hr />
                        <Form.Item
                            label="Tổng tiền"
                            className="checkout-sum"
                            style={{ fontWeight: "bold", paddingBottom: 20, paddingTop: 20, marginLeft: 20 }}>{cart?.total} VNĐ</Form.Item>
                    </Form>
                </div>
                <div className="group-btn-checkout">
                    <Button className="text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block" onClick={() => { window.location.reload(); history('/profile') }} >Hoàn Thành</Button>
                    <Button type="primary" className="btn-checkout text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block" onClick={() => { payment() }}>Thanh toán</Button>
                </div>
            </Col>
        </Row>
    )
}

export default Checkout