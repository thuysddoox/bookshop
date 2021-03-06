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
                    <h2 style={{ paddingLeft: 130, paddingBottom: 10, fontSize: 40 }}>H??a ????n</h2>
                    <Form.Item
                        label="H??? t??n"
                        rules={[
                            {
                                required: true,
                                message: 'H??y ??i???n t??n!',
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
                                message: 'H??y ??i???n email!',
                            },
                        ]}
                    >
                        <Input value={user?.email} />
                    </Form.Item>
                    <Form.Item
                        label="S??? ??i???n tho???i"
                        rules={[
                            {
                                required: true,
                                message: 'H??y ??i???n s??? ??i???n tho!',
                            },
                        ]}>
                        <Input value={user?.telephone} />
                    </Form.Item>
                    <Form.Item
                        label="?????a ch???"
                        rules={[
                            {
                                required: true,
                                message: 'H??y ??i???n ?????a ch???!',
                            },
                        ]}>
                        <Input value={user?.address?.no_home + " " + user?.address?.street + " " + user?.address?.district} />
                    </Form.Item>
                    <Form.Item
                        label="Th??nh ph???"
                        rules={[
                            {
                                required: true,
                                message: 'H??y ??i???n th??nh ph???!',
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
                    <h2 style={{ paddingLeft: 130, paddingBottom: 10, fontSize: 40 }}>Thanh to??n</h2>
                    <Form.Item name="checkbox-group" style={{ paddingLeft: 100 }}>
                        <Checkbox
                            value="sameAddress"
                            style={{
                                lineHeight: '32px',
                            }}
                        >
                            ?????a ch??? thanh to??n c??ng l?? ?????a ch??? giao h??ng
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="select"
                        label="Select"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'H??y ch???n h??nh th???c thanh to??n!',
                            },
                        ]}
                    >
                        <Select placeholder="Ch???n h??nh th???c thanh to??n">
                            <Option value="off">Thanh to??n khi nh???n h??ng</Option>
                            <Option value="onl-bank">Thanh to??n b???ng th??? ng??n h??ng</Option>
                            <Option value="onl-card">Thanh to??n b???ng v?? ??i???n t???</Option>
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
                            Gi??? h??ng
                            <span className="cart-number">
                                <ShoppingCartOutlined style={{ paddingRight: 10 }} />
                                <b>{cart?.item_book.length}</b>
                            </span>
                        </h2>
                        {
                            cart?.item_book.map((item, id) => (
                                <div key={id} className="border-b border-green border-solid p-2 flex items-center">
                                    <span className="w-1/3 inline-block">{item?.book?.title}</span>
                                    <span className="w-2/3 inline-block">{item?.quantity} * {item?.price} = {item?.quantity * item?.price} VN??</span>
                                </div>
                            ))
                        }
                        <hr />
                        <Form.Item
                            label="T???ng ti???n"
                            className="checkout-sum"
                            style={{ fontWeight: "bold", paddingBottom: 20, paddingTop: 20, marginLeft: 20 }}>{cart?.total} VN??</Form.Item>
                    </Form>
                </div>
                <div className="group-btn-checkout">
                    <Button className="text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block" onClick={() => { window.location.reload(); history('/profile') }} >Ho??n Th??nh</Button>
                    <Button type="primary" className="btn-checkout text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block" onClick={() => { payment() }}>Thanh to??n</Button>
                </div>
            </Col>
        </Row>
    )
}

export default Checkout