const protocol = 'http'
const domain = 'xserver.top'
const prefix = `${protocol}://${domain}/webhooks`

const api = {
    getCIConfig: `${prefix}/deploy/xci/ciconfig`,
    getCIFlow: `${prefix}/xci/xnosql/ciflow/page`,
    delCIFlow: `${prefix}/xci/xnosql/ciflow/destroy/`
}

export default api