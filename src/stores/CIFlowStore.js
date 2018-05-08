import { observable, action } from 'mobx'
import axios from 'axios'
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
    let res = await axios.post(api.getCIFlow, inparam)
    if (inparam.options.skip == 0) {
      res.data.res.map((value, index) => {
        value.key = (index + 1).toString()
      })
      this.setData(res.data.res)
    } else {
      res.data.res.map((value, index) => {
        value.key = (this.flow.length + index + 1).toString()
      })
      this.appendData(res.data.res)
    }
    this.closeLoading()
  }

  async del(id) {
    this.openLoading()
    let res = await axios.get(`${api.delCIFlow}${id}`)
    if (!res.data.err) {
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