import { Layout, Menu, Dropdown, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./HeaderMenu.css";
import { useEffect, useState } from "react";
import { getCarts } from "../../network/api/cart";

const { Header } = Layout;
const { Search } = Input;

function HeaderMenu() {
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem("username")));
    const [token, setToken] = useState(localStorage.getItem("access_token") || '');
    const [logined, setLogined] = useState(localStorage.getItem("logined") || false);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [number_items, setNumber_items] = useState(localStorage.getItem("number_items"));
    const history = useNavigate();
    async function getListCarts() {
        getCarts(JSON.parse(token), JSON.parse(userId))
            .then(response => {
                console.log(response)
                if (response?.data?.carts) {
                    let carts = response?.data?.carts[response?.data?.carts.findIndex((cart) => cart.is_order === false)];
                    localStorage.setItem('number_items', carts?.item_book.length);
                    setNumber_items(carts?.item_book.length)
                }
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        setLogined(localStorage.getItem("logined") || false);
        if (logined) {
            setUsername(JSON.parse(localStorage.getItem("username")));
            setToken(localStorage.getItem("access_token") || '');
            setUserId(localStorage.getItem("userId"));
            setNumber_items(localStorage.getItem("number_items"));
            getListCarts();
        }
    }, [localStorage])
    return (
        <Layout>
            <Header
                style={{
                    position: "fixed",
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <div className="logo">Bookstore</div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item key={"1"}>
                        <a href="/">Trang Chủ</a>
                    </Menu.Item>
                    <Menu.Item key={"2"}>Về Chúng Tôi</Menu.Item>
                    <Menu.Item key={"3"}>
                        <Link to="/contact">Liên Hệ</Link>
                    </Menu.Item>
                </Menu>
                <Search placeholder="Tìm kiếm..." />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key={"4"}>
                        <Link to="/cart" className="cart">
                            <ShoppingCartOutlined />
                            {logined && <span className="quantity">{number_items ?? 0}</span>}
                        </Link>
                    </Menu.Item>
                    {logined ? (<Menu.Item key={"5"}>
                        <Dropdown
                            overlay={
                                <Menu key="dropdown">
                                    <Menu.Item key="dropdown-1">Tài Khoản</Menu.Item>
                                    <Menu.Item key="dropdown-2" onClick={() => { localStorage.clear() }}>
                                        <Link to="/login">Đăng Xuất</Link>
                                    </Menu.Item>
                                </Menu>
                            }
                            placement="bottomRight"
                            arrow>
                            <p>{username}</p>
                        </Dropdown>

                    </Menu.Item>) : (
                        <Link to="/login">
                            <p>Signin/Signup</p>
                        </Link>
                    )}
                </Menu>
            </Header>
        </Layout>
    );
}

export default HeaderMenu;
