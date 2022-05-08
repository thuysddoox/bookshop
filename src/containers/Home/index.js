import { Layout } from 'antd'

const { Content } = Layout

function Home() {
    return (
        <div>
            <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                }}
            >
                <div
                    className="site-layout-background  min-h-screen"
                    style={{
                        padding: 24,
                        // minHeight: 380,
                    }}
                >
                    Content
                </div>
            </Content>
        </div>
    )
};

export default Home