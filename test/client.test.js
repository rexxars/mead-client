/* eslint-disable id-length */
const test = require('tape')
const Client = require('..')

test('throws on missing host', t => {
  t.throws(() => new Client(), /`host` option/)
  t.throws(() => new Client({foo: 'bar'}), /`host` option/)
  t.end()
})

test('does not throw on valid options', t => {
  t.doesNotThrow(() => new Client({host: 'http://mead.science/'}))
  t.end()
})

test('builds urls without query params correctly', t => {
  const client = new Client({host: 'https://mead.espen.codes'})
  const url = client.getUrl('/path/to/image.png')
  t.equal(url, 'https://mead.espen.codes/path/to/image.png')
  t.end()
})

test('builds urls with query params correctly', t => {
  const client = new Client({host: 'http://mead.espen.codes'})
  const url = client.getUrl('/path/to/image.png', {w: 1280, h: 720})
  t.equal(url, 'http://mead.espen.codes/path/to/image.png?w=1280&h=720')
  t.end()
})

test('builds urls with encoded query params correctly', t => {
  const client = new Client({host: 'http://mead.espen.codes'})
  const url = client.getUrl('/path/to/image.png', {blåbær: 'syltetøy'})
  t.equal(url, 'http://mead.espen.codes/path/to/image.png?bl%C3%A5b%C3%A6r=syltet%C3%B8y')
  t.end()
})

test('can be told to build protocol-less urls', t => {
  const client = new Client({host: 'http://mead.espen.codes', protocolLess: true})
  const url = client.getUrl('/path/to/image.png')
  t.equal(url, '//mead.espen.codes/path/to/image.png')
  t.end()
})

test('automatically builds protocol-less urls when host is protocol-less', t => {
  const client = new Client({host: '//mead.espen.codes'})
  const url = client.getUrl('/path/to/image.png')
  t.equal(url, '//mead.espen.codes/path/to/image.png')
  t.end()
})

test('can be told to override protocol with HTTPS', t => {
  const client = new Client({host: 'http://mead.espen.codes', useHTTPS: true})
  const url = client.getUrl('/path/to/image.png')
  t.equal(url, 'https://mead.espen.codes/path/to/image.png')
  t.end()
})

test('url-encodes "path" if it is a URL', t => {
  const client = new Client({host: 'https://mead.espen.codes'})
  const url = client.getUrl('https://cdn.rawgit.com/rexxars/mead/master/assets/mead.png')
  t.equal(url, 'https://mead.espen.codes/https%3A%2F%2Fcdn.rawgit.com%2Frexxars%2Fmead%2Fmaster%2Fassets%2Fmead.png')
  t.end()
})

test('does not pass on user-specified "s"-parameter', t => {
  const client = new Client({host: 'http://mead.espen.codes'})
  const url = client.getUrl('/path/to/image.png', {s: 'foo', h: 720})
  t.equal(url, 'http://mead.espen.codes/path/to/image.png?h=720')
  t.end()
})

test('signs urls correctly when token is specified', t => {
  const client = new Client({host: 'http://mead.espen.codes', token: 'foo'})
  const url = client.getUrl('/path/to/image.png')
  t.equal(url, 'http://mead.espen.codes/path/to/image.png?s=b8a1b001c5c1858b5d0afa1d3e1a207c')
  t.end()
})

test('signs urls correctly when token is specified (alternative option name)', t => {
  const client = new Client({host: 'http://mead.espen.codes', secureURLToken: 'foo'})
  const url = client.getUrl('/path/to/image.png')
  t.equal(url, 'http://mead.espen.codes/path/to/image.png?s=b8a1b001c5c1858b5d0afa1d3e1a207c')
  t.end()
})

test('signs urls correctly with query params', t => {
  const client = new Client({host: 'http://mead.espen.codes', secureURLToken: 'foo'})
  const url = client.getUrl('/path/to/image.png', {w: 1280, h: 720})
  t.equal(url, 'http://mead.espen.codes/path/to/image.png?w=1280&h=720&s=b833da21394ebb023e9ca9280e62b15f')
  t.end()
})

test('exposes path builder as static function', t => {
  var path = Client.buildPath({url: 'path/to/image.png', query: {w: 1280, h: 720}, token: 'foo'})
  t.equal(path, '/path/to/image.png?w=1280&h=720&s=b833da21394ebb023e9ca9280e62b15f')
  t.end()
})

test('exposes signing function as static function', t => {
  var path = Client.signQuery('foo', '/path/to/image.png')
  t.equal(path, 'b8a1b001c5c1858b5d0afa1d3e1a207c')

  var qPath = Client.signQuery('foo', '/path/to/image.png', '?w=1280&h=720')
  t.equal(qPath, 'b833da21394ebb023e9ca9280e62b15f')

  t.end()
})
