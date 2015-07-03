var tcp = require('net')
var transport = require('spdy-transport')

tcp.createServer(function (socket) {
  var server = transport.connection.create(socket, {
    protocol: 'spdy',
    windowSize: 256,
    isServer: true
  })

  server.on('frame', function (frame) {
    console.log(frame.type)
  })



  server.on('stream', function (stream) {
    console.log('got new stream')
    console.log(stream.method, stream.path, stream.headers)

    stream.respond(200, {
      there: 'there'
    }, function ready(){
      // stream.write('how is it going (server askking) ')
    
    })

    // stream.write('how is it going (server askking) ')

    stream.sendHeaders({
      more: 'headers'
    })

    stream.on('readable', function () {
      var chunk = stream.read()
      if (!chunk) {
        return
      }
      console.log(chunk.toString())
    })

    stream.on('end', function () {
      console.log('end')
    })

  })

}).listen(9090)
