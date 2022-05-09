import { Col, Row, Form, Input, Select, Checkbox } from "antd"

const { Option } = Select;

function Checkout(){
    return(
        <Row style={{paddingTop: 100, paddingBottom: 160}}>
            <Col span={12}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <h2 style={{paddingLeft: 130, paddingBottom: 30, fontSize: 40}}>Hóa Đơn</h2>
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
            </Col>
            <Col span={12}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <h2 style={{paddingLeft: 130, paddingBottom: 30, fontSize: 40}}>Thanh toán</h2>
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
                        <Option value="onl">Thanh toán bằng ví điện tử</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default Checkout