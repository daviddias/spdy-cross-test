var tcp = require('net')
var fs = require('fs')

function snif (srcPort, dstPort, srcName, dstName) {
  var folder = __dirname + /capture/

  tcp.createServer(function (srcSocket) {
    var dstSocket = tcp.connect({port: dstPort}, connected)

    function connected () {
      srcSocket.pipe(dstSocket)
      dstSocket.pipe(srcSocket)

      dstSocket.pipe(fs.createWriteStream(folder + srcName + '.in'))
      srcSocket.pipe(fs.createWriteStream(folder + srcName + '.out'))

      srcSocket.pipe(fs.createWriteStream(folder + dstName + '.in'))
      dstSocket.pipe(fs.createWriteStream(folder + dstName + '.out'))
    }

  }).listen(srcPort)
}

snif(8080, 9090, 'node-c', 'node-s')
