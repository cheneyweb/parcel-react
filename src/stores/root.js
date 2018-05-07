import CIConfigStore from './CIConfigStore'
import CIFlowStore from './CIFlowStore'

// 全局根存储
class RootStore {
  constructor() {
    this.ciConfigStore = new CIConfigStore(this)
    this.ciFlowStore = new CIFlowStore(this)
  }
}

export default new RootStore()
