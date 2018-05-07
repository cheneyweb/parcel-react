import React from 'react'
import { Route, Link } from "react-router-dom"

import { Layout, Menu, Icon } from 'antd'
const { Header, Content, Footer, Sider } = Layout

import TreeDemo from './TreeDemo'
import TableDemo from './TableDemo'
import CIConfig from './CIConfig'

export default class App extends React.Component {
    renderLayout() {
        return <Layout>
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Link to="/tree">
                            <Icon type="bars" />
                            <span className="nav-text">树形</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/table">
                            <Icon type="table" />
                            <span className="nav-text">表格</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/nostate">
                            <Icon type="nostate" />
                            <span className="nav-text">无状态组件</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/ciconfig">
                            <Icon type="ciconfig" />
                            <span className="nav-text">构建配置</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                <Content style={{ margin: '24px 16px 70px', overflow: 'initial' }}>
                    <Route path="/tree" component={TreeDemo} />
                    <Route path="/table" component={TableDemo} />
                    <Route path="/nostate" component={NoState} />
                    <Route path="/ciconfig" component={CIConfig} />
                </Content>
                <Footer style={{ position: 'fixed', bottom: 0, height: '70px', width: '100%', textAlign: 'center' }}>
                    XServer Design ©2018 Created by CheneyXu
                </Footer>
            </Layout>
        </Layout>
    }
    render() {
        return <div>{this.renderLayout()}</div>
    }
}

// 无状态函数式组件演示
function NoState(props) {
    return <div>我是一个函数式定义的react组件</div>
}