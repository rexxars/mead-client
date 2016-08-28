var crypto = require('crypto')

function MeadClient(config) {
  if (!config || !config.host) {
    throw new Error('Mead `host` option must be specified')
  }

  this.config = Object.assign({}, config, {
    host: config.host.replace(/^(https?:)?\/\//i, ''),
    protocol: getProtocol(config),
    token: config.token || config.secureURLToken
  })
}

MeadClient.prototype.getUrl = function (path, query) {
  var urlPath = buildPath({url: path, query: query, token: this.config.token})
  return this.config.protocol + this.config.host + urlPath
}

// Statics
MeadClient.buildPath = buildPath
MeadClient.signQuery = signQuery

function buildPath(opts) {
  var path = /^https?:\/\//i.test(opts.url) ? encodeURIComponent(opts.url) : encodeURI(opts.url)
  path = path[0] === '/' ? path : '/' + path

  var parts = []
  var query = opts.query || {}
  for (var key in query) {
    if (key !== 's' && query.hasOwnProperty(key)) {
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
    }
  }

  var qs = parts.length > 0 ? '?' + parts.join('&') : ''
  if (!opts.token) {
    return path + qs
  }

  var signature = signQuery(opts.token, path, qs)
  qs += (qs.length ? '&s=' : '?s=') + signature
  return path + qs
}

function signQuery(token, path, query) {
  return crypto.createHash('md5').update(token + path + (query || '')).digest('hex')
}

function getProtocol(config) {
  if (config.useHTTPS) {
    return 'https://'
  }

  var protocolLess = /^\/\//.test(config.host) || config.protocolLess
  return protocolLess ? '//' : config.host.replace(/^(https?:\/\/).*/i, '$1')
}

module.exports = MeadClient
