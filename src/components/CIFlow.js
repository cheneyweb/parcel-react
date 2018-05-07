import React from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Icon, Divider, Input, Popover } from 'antd'
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
        this.store.load({ "sort": { "createdAt": -1 }, "options": { "limit": 10, "skip": 0 } })
    }
    render() {
        return <Table dataSource={this.store.flow} size="small">
            {/* <ColumnGroup title="Name"> */}
            <Column
                title="服务"
                dataIndex="server"
                key="server"
            />
            {/* </ColumnGroup> */}
            <Column
                title="类型"
                dataIndex="type"
                key="type"
            />
            <Column
                title="状态"
                dataIndex="status"
                key="status"
            />
            <Column
                title="构建脚本"
                dataIndex="command"
                key="command"
                render={text => <Popover placement="rightTop" content={<TextArea style={{ width: '600' }} value={JSON.stringify(text, null, 2)} autosize="true" />} title="构建脚本"><a>显示构建脚本</a></Popover>}
            />
            <Column
                title="构建时间"
                dataIndex="createdAt"
                key="createdAt"
                render={text => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>}
            />
            <Column
                title="完成时间"
                dataIndex="updatedAt"
                key="updatedAt"
                render={text => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>}
            />
            <Column
                title="构建结果"
                dataIndex="command"
                key="command"
                render={text => <Popover placement="leftTop" content={<TextArea style={{ width: '600' }} value={JSON.stringify(text, null, 2)} autosize="true" />} title="构建结果"><a>显示构建结果</a></Popover>}
            />
            <Column
                title="操作"
                key="action"
                render={(text, record) => (
                    <span>
                        <a href="javascript:;">重放</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">删除</a>
                    </span>
                )}
            />
        </Table>
    }
}