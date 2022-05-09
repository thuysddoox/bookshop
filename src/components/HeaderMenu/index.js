import { Layout, Menu, Dropdown, Input } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import './HeaderMenu.css'

const { Header } = Layout;
const { Search } = Input

function HeaderMenu (){
    return(
        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <div className="logo">Bookstore</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key={'1'}>
                        <Link to="/">Trang Chủ</Link>
                        </Menu.Item>
                    <Menu.Item key={'2'}>Về Chúng Tôi</Menu.Item>
                    <Menu.Item key={'3'}>Liên Hệ</Menu.Item>
                </Menu>
                <Search placeholder="Tìm kiếm..."   />
                <Menu
                    theme="dark"
                    mode="horizontal"
                >
                    <Menu.Item key={'4'}>
                        <ShoppingCartOutlined/>
                    </Menu.Item>
                    <Menu.Item key={'5'}>
                        <Dropdown
                            overlay={
                            <Menu key="dropdown">
                                <Menu.Item key="dropdown-1">Tài Khoản</Menu.Item>
                                <Menu.Item key="dropdown-2">Đăng Xuất</Menu.Item>
                                    </Menu>
                                    }
                                    placement="bottomRight"
                                    arrow
                            >
                            <p>Quỳnh Anh</p>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    )
};

export default HeaderMenu