import { Button, Col, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addCart, createOrder, getCarts } from "../../network/api/cart"
import "./Cart.css"
import CartItem from "./CartItem"

const { Title } = Typography

function Cart() {
    const [token] = useState(localStorage.getItem("access_token"));
    const [logined] = useState(localStorage.getItem("logined") || false);
    const [userId] = useState(localStorage.getItem("userId"));
    const [cart, setCart] = useState();
    const [total, setTotal] = useState();
    const history = useNavigate();

    function updateCart() {
        const itembooks = [];
        const numbers = [];
        let total = 0;
        const quantityItem = [...document.getElementsByClassName('quantity-item')];
        quantityItem.forEach((item) => {
            numbers.push(parseInt(item.innerText))

        })
        cart.item_book.forEach((item, id) => {
            itembooks.push(item?._id);
            total += (numbers[id] * itembooks[id]?.price)
        })
        console.log(numbers);
        console.log(itembooks);
        setTotal(total)
        save({ item_book: itembooks, quantity: numbers, user: JSON.parse(userId) });
        // window.location.reload();
    }
    function deleteBook(id) {
        const itembooks = [];
        const numbers = [];
        console.log(id)
        let total = 0;
        const quantityItem = [...document.getElementsByClassName('quantity-item')];
        quantityItem?.forEach((item, index) => {
            if (index != id) numbers.push(parseInt(item.innerText))
        })
        cart?.item_book?.forEach((item, index) => {
            if (index != id) itembooks.push(item?._id);
        })

        console.log(numbers);
        console.log(itembooks);
        setTotal(total)
        save({ item_book: itembooks, quantity: numbers, user: JSON.parse(userId) });
    }
    async function save(data) {
        addCart(JSON.parse(token), data)
            .then(response => {
                // console.log(response);
                getCart();
                alert(response?.data?.message);
            })
            .catch(error => {
                console.log(error);
            })
    }
    async function getCart() {
        getCarts(JSON.parse(token), JSON.parse(userId))
            .then(response => {
                // console.log(response)
                if (response?.data?.carts) {
                    let carts = response?.data?.carts;
                    setCart(response?.data?.carts[response?.data?.carts.findIndex((cart) => cart.is_order === false)])
                }
            })
            .catch(error => { console.log(error); history('/login'); localStorage.clear(); window.location.reload(); })
    }
    async function order() {
        createOrder({ cart: cart?._id })
            .then(response => {
                localStorage.setItem('orderId', response?.data?.data?._id);
                localStorage.setItem('cartId', response?.data?.data?.cart);
                console.log(response);
                history('/checkout');
            }).catch(error => { console.log(error); })
    }
    useEffect(() => {
        if (logined) {
            getCart();
        }
        else history('/login')
    }, [])
    useEffect(() => {
        setTotal(cart?.total)
    }, [cart])
    return (
        <div className="cart container">
            <Row>
                <Col span={15} className="cart-content">
                    <Title>Giỏ hàng của tôi</Title>
                    {
                        cart?.item_book?.map((item, id) => (
                            <CartItem
                                key={item._id}
                                index={id}
                                img={`${item?.book?.image}`}
                                name={item?.book?.title}
                                price={item?.price}
                                category={item?.book?.category?.type}
                                quantity={item?.quantity ?? 1}
                                delete={deleteBook}
                            />
                        ))
                    }
                    <button className="text-white bg-green block text-center px-4 py-2 rounded-lg cursor-pointer inline-block" onClick={() => updateCart()}>Lưu thay đổi</button>
                </Col>
                <Col span={1}></Col>
                <Col span={8} className="cart-content" style={{ height: "100%" }}>
                    <Title>Tổng cộng</Title>
                    <hr style={{ paddingBottom: 20 }} />
                    <p className="cart-checkout-item">
                        <span className="cart-checkout-item-text">Thành tiền</span>
                        <span>{total || cart?.total} VNĐ</span>
                    </p>
                    <p className="cart-checkout-item">
                        <span className="cart-checkout-item-text">Phí giao hàng</span>
                        <span>0 VNĐ</span>
                    </p>
                    <hr style={{ paddingBottom: 20 }} />
                    <Button type="primary" style={{ width: "100%" }} className="text-white bg-green block text-center rounded-lg cursor-pointer" onClick={() => order()}>Đặt Hàng</Button>
                </Col>
                <hr />
            </Row>

        </div>
    )
}

export default Cart