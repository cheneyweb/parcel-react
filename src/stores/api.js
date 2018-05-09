import axios from 'axios'
import { message } from 'antd'

const protocol = 'http'
// const domain = 'localhost:10001'
const domain = 'xserver.top'
const prefix = `${protocol}://${domain}`

// 处理请求失败
axios.interceptors.response.use(response => {
    return response
}, error => {
    if (!error.response) {
        message.error(`网络连接断开`, 2)
    } else {
        message.error(`服务异常`, 1)
    }
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了
    // return Promise.resolve(error.response)
})

const api = {
    getCIConfig: `${prefix}/xci/controller/ci/config`,
    updateCIConfig: `${prefix}/xci/controller/ci/configupdate`,
    getCIFlow: `${prefix}/xci/xnosql/ciflow/page`,
    delCIFlow: `${prefix}/xci/xnosql/ciflow/destroy/`,

    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                resolve(res.data)
            })
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then((res) => {
                resolve(res.data)
            })
        })
    }
}

export default api