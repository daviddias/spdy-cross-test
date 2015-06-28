package main

import (
	"fmt"
	"github.com/docker/spdystream"
	"net"
	"net/http"
)

func main() {
	conn, err := net.Dial("tcp", "localhost:9090")
	if err != nil {
		panic(err)
	}
	spdyConn, err := spdystream.NewConnection(conn, false)
	if err != nil {
		panic(err)
	}

	header := http.Header{}
	header.Add(":method", "POST")
	header.Add(":path", "/")

	stream, err := spdyConn.CreateStream(header, nil, false)
	if err != nil {
		panic(err)
	}

	stream.Wait()

	fmt.Fprint(stream, "Writing to stream")

	buf := make([]byte, 25)
	stream.Read(buf)
	fmt.Println(string(buf))

	stream.Close()
}
