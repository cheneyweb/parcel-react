import { observable } from 'mobx'

// Store1
class UserStore {
  @observable users = []
  constructor(rs) {
    this.rs = rs
  }
  getAll() {
    return this.users
  }
  getTodos(user) {
    // 通过根 store 来访问 todoStore
    return this.rs.todoStore.todos.filter(todo => todo.author === user)
  }
  addUser(content) {
    this.users.push({
      content: content
    })
  }
}

// Store2
class TodoStore {
  @observable todos = []
  constructor(rs) {
    this.rs = rs
  }
  getAll() {
    return this.todos
  }
  addTodo(content) {
    this.todos.push({
      content: content
    })
  }
}

// 全局根存储
class RootStore {
  constructor() {
    this.userStore = new UserStore(this)
    this.todoStore = new TodoStore(this)
  }
}

export default new RootStore()
