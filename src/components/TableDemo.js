import React from 'react'
import { Table, Icon, Divider } from 'antd'
const { Column, ColumnGroup } = Table

const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

export default class TableDemo extends React.Component {
    render() {
        return <Table dataSource={data} size="small">
            {/* <ColumnGroup title="Name"> */}
                <Column
                    title="序号"
                    dataIndex="firstName"
                    key="firstName"
                />
                <Column
                    title="服务"
                    dataIndex="lastName"
                    key="lastName"
                />
            {/* </ColumnGroup> */}
            <Column
                title="类型"
                dataIndex="age"
                key="age"
            />
            <Column
                title="构建时间"
                dataIndex="address"
                key="address"
            />
            <Column
                title="完成时间"
                dataIndex="address"
                key="address"
            />
            <Column
                title="操作"
                key="action"
                render={(text, record) => (
                    <span>
                        <a href="javascript:;">Action 一 {record.name}</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">Delete</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" className="ant-dropdown-link">
                            More actions <Icon type="down" />
                        </a>
                    </span>
                )}
            />
        </Table>
    }
}