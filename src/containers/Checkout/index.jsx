import { Col, Row, Form, Input, Select, Checkbox, Button } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import "./Checkout.css"

const { Option } = Select;

function Checkout(){
    return(
        <Row style={{paddingTop: 100, paddingBottom: 30}}>
            <Col span={16}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                >
                    <h2 style={{paddingLeft: 130, paddingBottom:10, fontSize: 40}}>Hóa Đơn</h2>
                    <Form.Item 
                        label="Họ tên"
                        rules={[
                        {
                            required: true,
                            message: 'Hãy điền tên!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Email"
                        rules={[
                        {
                            required: true,
                            message: 'Hãy điền email!',
                        },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Số điện thoại"
                        rules={[
                        {
                            required: true,
                            message: 'Hãy điền số điện tho!',
                        },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Địa chỉ"
                        rules={[
                        {
                            required: true,
                            message: 'Hãy điền địa chỉ!',
                        },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Thành phố"
                        rules={[
                        {
                            required: true,
                            message: 'Hãy điền thành phố!',
                        },
                        ]}>
                        <Input />
                    </Form.Item>
                </Form>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                >
                    <h2 style={{paddingLeft: 130, paddingBottom: 10, fontSize: 40}}>Thanh toán</h2>
                    <Form.Item name="checkbox-group" style={{paddingLeft: 100}}>
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
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 24 }}
                        layout="horizontal"
                    >
                        <h2 className="checkout-cart-detail-title">
                            Giỏ hàng
                            <span className="cart-number">
                                <ShoppingCartOutlined style={{paddingRight: 10}}/>
                                <b>4</b>
                            </span>
                        </h2>
                        <Form.Item label="Item 1">150.000 VNĐ</Form.Item>
                        <Form.Item label="Item 1">150.000 VNĐ</Form.Item>
                        <Form.Item label="Item 1">150.000 VNĐ</Form.Item>
                        <Form.Item label="Item 1">150.000 VNĐ</Form.Item>
                        <hr />
                        <Form.Item label="Tổng tiền" className="checkout-sum">600.000 VNĐ</Form.Item>
                    </Form>
                </div> 
                <div className="group-btn-checkout">
                    <Button style={{height: 50, fontSize: 18}}>Hủy</Button>
                    <Button type="primary"className="btn-checkout" style={{height: 50, fontSize: 18}}>Thanh toán</Button>
                </div>              
            </Col>
        </Row>
    )
}

export default Checkout