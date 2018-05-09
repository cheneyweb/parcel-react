import { observable, action } from 'mobx'
import api from './api'
import BaseStore from './BaseStore'

// CI服务流Store
export default class CIFlowStore extends BaseStore {
  @observable flow = []
  constructor(rs) {
    super(rs)
    this.rs = rs
  }

  // 可以使用async...await，同时箭头表达式可以解决this指向问题
  async load(inparam) {
    this.openLoading()
    let data = await api.post(api.getCIFlow, inparam)
    if (inparam.options.skip == 0) {
      data.res.map((value, index) => {
        value.key = (index + 1).toString()
      })
      this.setData(data.res)
    } else {
      data.res.map((value, index) => {
        value.key = (this.flow.length + index + 1).toString()
      })
      this.appendData(data.res)
    }
    this.closeLoading()
  }

  async del(id) {
    this.openLoading()
    let data = await api.get(`${api.delCIFlow}${id}`)
    if (!data.err) {
      let data = this.flow.filter((item) => {
        return item._id != id
      })
      this.setData(data)
    }
    this.closeLoading()
  }

  @action setData(data) {
    this.flow = data
  }
  @action appendData(data) {
    this.flow.push(...data)
  }
}