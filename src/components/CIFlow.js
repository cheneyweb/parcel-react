import React from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Icon, Divider, Input, Popover, Button } from 'antd'
import dayjs from "dayjs"

const { Column } = Table
const TextArea = Input.TextArea

@inject('rs')   //注入Provider提供的rootStore到该组件的props中
@observer       //设置当前组件为观察者,检测到store中被监测者发生变化就会进行视图的强制刷新
export default class CIFlow extends React.Component {
    store = {}

    constructor(props) {
        super(props)
        this.store = this.props.rs.ciFlowStore
        this.reload()
    }
    async reload(skip = 0) {
        this.store.load({ "sort": { "createdAt": -1 }, "options": { "limit": 5, "skip": skip } })
    }
    async del(id) {
        this.store.del(id)
    }
    render() {
        return <div>
            <Divider>持续集成服务流</Divider>
            <Button onClick={() => this.reload()} type="primary">刷新</Button>&nbsp;&nbsp;
            <Button onClick={() => this.reload(this.store.flow.length)} type="default">加载更多</Button>
            <br /><br />
            <Table dataSource={this.store.flow.slice()} size="small" pagination={false}>
                {/* <ColumnGroup title="Name"> */}
                <Column
                    title="序号"
                    dataIndex="key"
                />
                <Column
                    title="服务"
                    dataIndex="server"
                />
                {/* </ColumnGroup> */}
                <Column
                    title="类型"
                    dataIndex="type"
                />
                <Column
                    title="状态"
                    dataIndex="status"
                />
                <Column
                    title="构建脚本"
                    dataIndex="command"
                    render={text => <Popover placement="rightTop" content={<TextArea style={{ width: '600' }} value={JSON.stringify(text, null, 2)} autosize="true" />} title="构建脚本"><a>显示构建脚本</a></Popover>}
                />
                <Column
                    title="构建时间"
                    dataIndex="createdAt"
                    render={text => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>}
                />
                <Column
                    title="完成时间"
                    dataIndex="updatedAt"
                    render={text => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>}
                />
                <Column
                    title="构建结果"
                    dataIndex="commandResult"
                    render={text => <Popover placement="leftTop" content={<TextArea style={{ width: '600' }} value={JSON.stringify(text, null, 2)} autosize="true" />} title="构建结果"><a>显示构建结果</a></Popover>}
                />
                <Column
                    title="操作"
                    dataIndex="action"
                    render={(text, record) => (
                        <span>
                            <a href="javascript:;">重放</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.del(record._id)} >删除</a>
                        </span>
                    )}
                />
            </Table>
        </div>
    }
}