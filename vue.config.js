const pkg = require('./package.json')

process.env.VUE_APP_VERSION = process.env.VUE_APP_VERSION || pkg.version

const baseUrl = process.env.NODE_ENV === 'production' ? `/${pkg.name}/` : '/'

module.exports = {
  baseUrl
}
