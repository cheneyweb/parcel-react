import React from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Icon, Divider, Input, Popover, Button, Popconfirm } from 'antd'
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
    reload(skip = 0) {
        this.store.load({ "sort": { "createdAt": -1 }, "options": { "limit": 20, "skip": skip } })
    }
    del(id) {
        this.store.del(id)
    }
    replay(id) {
        console.info('重放执行')
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
                    title="构建耗时"
                    dataIndex="runtime"
                    render={(text, record) => <span>{record.updatedAt ? ((record.updatedAt - record.createdAt) / 1000).toFixed(2) : 0}s</span>}
                />
                <Column
                    title="构建结果"
                    dataIndex="result"
                    render={text => <Popover placement="leftTop" content={<TextArea style={{ width: '600' }} value={JSON.stringify(text, null, 2)} autosize="true" />} title="构建结果"><a>显示构建结果</a></Popover>}
                />
                <Column
                    title="操作"
                    dataIndex="action"
                    render={(text, record) => (
                        <span>
                            <Popconfirm title="确认执行脚本重放吗?" onConfirm={() => this.replay(record._id)} okText="确认" cancelText="取消">
                                <a>重放</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm title="确认删除该构建流?" onConfirm={() => this.del(record._id)} okText="确认" cancelText="取消">
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
        </div>
    }
}