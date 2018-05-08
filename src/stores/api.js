const protocol = 'http'
// const domain = 'localhost:10001'
const domain = 'xserver.top'
const prefix = `${protocol}://${domain}`

const api = {
    getCIConfig: `${prefix}/xci/controller/ci/config`,
    getCIFlow: `${prefix}/xci/xnosql/ciflow/page`,
    delCIFlow: `${prefix}/xci/xnosql/ciflow/destroy/`
}

export default api