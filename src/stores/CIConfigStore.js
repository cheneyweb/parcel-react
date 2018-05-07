import { observable, action } from 'mobx'
import axios from 'axios'
import api from './api'

// CI配置Store
export default class CIConfigStore {
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