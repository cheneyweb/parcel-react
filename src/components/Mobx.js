import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('rs')   //注入Provider提供的rootStore到该组件的props中
@observer       //设置当前组件为观察者,检测到store中被监测者发生变化就会进行视图的强制刷新
class Mobx extends React.Component {
    todoStore = {}

    constructor(props) {
        super(props)
        this.todoStore = this.props.rs.todoStore
    }

    render() {
        console.info('页面重新刷新')
        return <div className="demo">
            <h1>MOBX</h1>
            {
                this.todoStore.getAll().map(function (item, index) {
                    return <div key={item.id}>{item.content}</div>
                })
            }
        </div>

    }
}

export default Mobx