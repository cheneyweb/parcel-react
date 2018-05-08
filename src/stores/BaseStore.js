import { observable, action } from 'mobx'

// 基类Store
export default class BaseStore {
  @observable loading = false

  @action openLoading() {
    this.loading = true
  }
  @action closeLoading() {
    this.loading = false
  }
}