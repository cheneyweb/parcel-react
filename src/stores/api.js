const protocol = 'http'
const domain = 'localhost:10001'
const prefix = `${protocol}://${domain}`

const api = {
    getCIConfig: `${prefix}/deploy/xci/ciconfig`,
    getCIFlow: `${prefix}/xci/xnosql/ciflow/page`,
    delCIFlow: `${prefix}/xci/xnosql/ciflow/destroy/`
}

export default api