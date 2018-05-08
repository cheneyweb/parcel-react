import { observable, action } from 'mobx'
import axios from 'axios'
import api from './api'
import BaseStore from './BaseStore'

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
    axios.get(api.getCIConfig).then((res) => {
      this.setData(res.data)
      this.closeLoading()
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