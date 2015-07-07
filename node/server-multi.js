var tcp = require('net')
var transport = require('spdy-transport')

tcp.createServer(function (socket) {
  var server = transport.connection.create(socket, {
    protocol: 'spdy',
    windowSize: 256,
    isServer: true
  }, function(){
    /* Doesn't err, but doesn't open the stream either
    server.request({
      method: 'get',
      host: 'localhost',
      path: '/',
      headers: {
        aaaa: 'bbb'
      }
    }, function (err, stream) {
      if (err) {
        return console.log(err)
      }
      console.log('woop, managed to request to a client')
    })
    */ 
  })

  server.on('stream', function (stream) {
    console.log('Received a new request stream')
    console.log(stream.method, stream.path, stream.headers)

    stream.respond(200, {
      there: 'there'
    })

    stream.on('readable', function () {
      var chunk = stream.read()
      if (!chunk) { return }
      console.log(chunk.toString())
    })

    stream.on('end', function () {
      console.log('end')
    })
  })

  // setTimeout(function () {
  server.request({
    method: 'GET',
    host: 'localhost',
    path: '/',
    headers: {
      aaaa: 'bbb'
    }
  }, function (err, stream) {
    if (err) {
      return console.log(err)
    }
    console.log('woop, managed to request to a client')
  })
  // }, 1000)

}).listen(9090)
