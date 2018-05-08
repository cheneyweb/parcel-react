import React from 'react'
import { inject, observer } from 'mobx-react'
import { Collapse, Input, Button, Divider, Spin } from 'antd'

const Panel = Collapse.Panel
const TextArea = Input.TextArea

@inject('rs')   //注入Provider提供的rootStore到该组件的props中
@observer       //设置当前组件为观察者,检测到store中被监测者发生变化就会进行视图的强制刷新
class CIConfig extends React.Component {
    store = {}

    constructor(props) {
        super(props)
        this.store = this.props.rs.ciConfigStore
        this.store.load()
    }

    render() {
        function callback(key) {
            console.log('回调:' + key)
        }
        return <div>
            <Divider>持续集成服务配置</Divider>
            <Button type="primary">保存</Button>&nbsp;&nbsp;
            <Button type="default">还原</Button>
            <br /><br />
            <Spin size="large" spinning={this.store.loading}>
                <Collapse defaultActiveKey={['0']} onChange={callback}>
                    {
                        Object.keys(this.store.ci).map((key, index, keyArr) => {
                            console.info(key)
                            console.info(index)
                            return <Panel header={key} key={index}>
                                <TextArea defaultValue={JSON.stringify(this.store.ci[key], null, 2)} autosize={{ minRows: 3, maxRows: 20 }} />
                            </Panel>
                        })
                    }
                </Collapse>
            </Spin>
        </div>
    }
}

export default CIConfig