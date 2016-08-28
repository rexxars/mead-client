/* YOLO-implementation of `crypto` that only implements non-binary md5 */
var md5 = require('blueimp-md5')

function createHash() {
  return new Hash()
}

function Hash() {
  this.buffer = ''
}

Hash.prototype.update = function (data) {
  this.buffer += data
  return this
}

Hash.prototype.digest = function () {
  return md5(this.buffer)
}

module.exports = {createHash: createHash}
