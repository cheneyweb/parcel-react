import { observable, action } from 'mobx'
import api from './api'
import BaseStore from './BaseStore'
import { message } from 'antd'

// CI配置Store
export default class CIConfigStore extends BaseStore {
  @observable ci = {}
  constructor(rs) {
    super(rs)
    this.rs = rs
  }

  // 可以使用async...await，同时箭头表达式可以解决this指向问题
  load() {
    this.openLoading()
    api.get(api.getCIConfig).then(data => {
      for (let key in data) {
        data[key] = JSON.stringify(data[key], null, 2)
      }
      this.setData(data)
      this.closeLoading()
    })
  }

  save() {
    const data = {}
    // 检查配置是否正确
    for (let key in this.ci) {
      try {
        data[key] = JSON.parse(this.ci[key])
      } catch (error) {
        message.error(`${key} 的配置存在错误`, 1)
        return
      }
    }
    // 请求保存
    this.openLoading()
    api.post(api.updateCIConfig, data).then(data => {
      this.load()
    })
  }

  @action handleChange(data) {
    this.ci[data.id] = data.value
  }

  @action setData(data) {
    this.ci = data
  }

  // getTodos(user) {
  //   // 通过根 store 来访问 todoStore
  //   return this.rs.todoStore.todos.filter(todo => todo.author === user)
  // }
}