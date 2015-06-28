var tcp = require('net')
var transport = require('spdy-transport')

var socket = tcp.connect({port: 9090}, function () {

  var client = transport.connection.create(socket, {
    protocol: 'spdy',
    isServer: false
  })

  client.request({ method: 'GET', host: 'localhost', path: '/' }, function (stream) {
    console.log('got stream')
  })

})
