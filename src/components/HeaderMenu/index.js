import { Layout, Menu, Dropdown, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import "./HeaderMenu.css";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Search } = Input;

function HeaderMenu() {
    const [username, setUsername] = useState();
    const [logined, setLogined] = useState(false);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        setLogined(JSON.parse(localStorage.getItem("logined")) || false);
        console.log(username, logined);
    }, [])
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
                        <Link to="/cart">
                            <ShoppingCartOutlined />
                        </Link>
                    </Menu.Item>
                    {logined ? (<Menu.Item key={"5"}>
                        <Dropdown
                            overlay={
                                <Menu key="dropdown">
                                    <Menu.Item key="dropdown-1">Tài Khoản</Menu.Item>
                                    <Menu.Item key="dropdown-2">
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
