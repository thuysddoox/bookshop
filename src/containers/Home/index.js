import HeaderMenu from "../../components/HeaderMenu"
import PageFooter from "../../components/PageFooter"
import { Layout } from 'antd'

const { Content } = Layout

function Home (){
    return(
        <div>
            <HeaderMenu />
            <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                }}
            >
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                    Content
                </div>
            </Content>
            <PageFooter />
        </div>
    )
};

export default Home