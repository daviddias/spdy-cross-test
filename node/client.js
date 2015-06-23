var tcp = require('net')
var transport = require('spdy-transport')

var socket = tcp.connect({port: 8899}, function () {

  var client = transport.connection.create(socket, {
    protocol: 'spdy',
    isServer: false
  })

  var stream = new transport.Stream(client, {
    request: true
  })
  stream.write('hey')

})
