var tcp = require('net')
var transport = require('spdy-transport')

var socket = tcp.connect({port: 9090}, function () {

  var client = transport.connection.create(socket, {
    protocol: 'spdy',
    windowSize: 256,
    isServer: false
  })

  client.on('frame', function (frame) {
    console.log(frame.type)
  })

  client.start(3.1)

  client.request({ method: 'GET', host: 'localhost', path: '/' }, function (err, stream) {
    if (err) {
      return console.log(err)
    }
    console.log('got stream')

    stream.on('response', function (code, headers) {
      console.log(code, headers)
    })
  })
})
