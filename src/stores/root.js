import { observable, action } from 'mobx'
import axios from 'axios'

const protocol = 'http'
const domain = 'localhost:10001'
const prefix = `${protocol}://${domain}`
const api = {
  getCIConfig: `${prefix}/deploy/xci/ciconfig`,
  getCIFlow: `${prefix}/xci/xnosql/ciflow/page`
}

// CI配置Store
class CIConfigStore {
  @observable ci = {}
  constructor(rs) {
    this.rs = rs
  }

  // 可以使用async...await，同时箭头表达式可以解决this指向问题
  load() {
    axios.get(api.getCIConfig).then((res) => {
      this.setData(res.data)
    })
  }

  @action setData(data) {
    this.ci = data
  }

  // getTodos(user) {
  //   // 通过根 store 来访问 todoStore
  //   return this.rs.todoStore.todos.filter(todo => todo.author === user)
  // }
}

// CI服务流Store
class CIFlowStore {
  @observable flow = []
  constructor(rs) {
    this.rs = rs
  }

  // 可以使用async...await，同时箭头表达式可以解决this指向问题
  load(inparam) {
    axios.post(api.getCIFlow, inparam).then((res) => {
      this.setData(res.data.res)
    })
  }

  @action setData(data) {
    this.flow = data
  }
}

// 全局根存储
class RootStore {
  constructor() {
    this.ciConfigStore = new CIConfigStore(this)
    this.ciFlowStore = new CIFlowStore(this)
  }
}

export default new RootStore()
