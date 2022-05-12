import { Col, Row, Form, Input } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { getCarts } from "../../network/api/cart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../network/api/user";
import "./style.css"
import OrderItem from "../../components/OrderItem";
import Masonry from "react-masonry-css";
const Profile = () => {
  const [user, setUser] = useState();
  const history = useNavigate();
  const [carts, setCarts] = useState();
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
        console.log(response)
        if (response?.data?.carts) {
          setCarts(response?.data?.carts.filter((cart) => cart.is_order === true))
        }
      })
      .catch(error => { console.log(error); history('/login'); localStorage.clear(); window.location.reload(); })
  }
  useEffect(() => {
    if (logined) {
      getCart();
      LoginJWT();
    }
    else history('/login');
  }, [])
  return (
    <>
      <Row style={{ paddingTop: 100, paddingBottom: 30 }} className="container mx-auto">
        <Col span={8}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <h2 style={{ paddingBottom: 10, fontSize: 40 }}>Thông tin cá nhân</h2>
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
        </Col>
        <Col span={16}>
          <div className="checkout-cart-detail bg-gray-100">
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 24 }}
              layout="horizontal"
            >
              <h2 className="checkout-cart-detail-title">
                Lịch sử đặt hàng
                <span className="cart-number">
                  <ShoppingCartOutlined style={{ paddingRight: 10 }} />
                  <b>{carts?.length}</b>
                </span>
              </h2>
              <Masonry
                breakpointCols={{
                  default: 3,
                  992: 2,
                  675: 1,
                }}
                className="my-masonry-grid p-8"
              >
                {carts?.length > 0 ?
                  carts.map((item, id) => (
                    <div key={id} className="mx-2 my-3">
                      <OrderItem index={id + 1} cart={item} />
                    </div>
                  ))
                  : <>Không có lịch sử mua hàng</>
                }
              </Masonry>
              <hr />
            </Form>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Profile;