import { observable, action } from 'mobx'
import axios from 'axios'
import api from './api'

// CI服务流Store
export default class CIFlowStore {
    @observable flow = []
    constructor(rs) {
      this.rs = rs
    }
  
    // 可以使用async...await，同时箭头表达式可以解决this指向问题
    async load(inparam) {
      let res = await axios.post(api.getCIFlow, inparam)
      res.data.res.map((value, index) => {
        value.key = index.toString()
      })
      this.setData(res.data.res)
    }
  
    async del(id) {
      let res = await axios.get(`${api.delCIFlow}${id}`)
      if (!res.data.err) {
        let data = this.flow.filter((item) => {
          return item._id != id
        })
        this.setData(data)
      }
    }
  
    @action setData(data) {
      this.flow = data
    }
  }