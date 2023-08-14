import express from 'express';
import cors from 'cors';
import net from 'net';
import ws from 'ws';
import http from 'http';
// import sip_parsing from 'sip-parsing';
const sip_parsing: any = require('sip-parsing') as any;

const app = express();
app.use(cors())
app.use(express.static(__dirname));
const http_server = http.createServer(app)

const wss = new ws.Server({ server: http_server });


function createStream(socket: ws.WebSocket, {
    host, port, timeout
  }: {
    host: string, 
    port: number,
    timeout?: number,
  }) : net.Socket {
    const stream = net.connect(port, host);
  
    stream.setEncoding('binary');
    if (timeout !== undefined) {
      stream.setTimeout(timeout);
    }
    // if (maxListeners !== undefined) {
    //   stream.setMaxListeners(maxListeners);
    // }
  
    // sip回来的数据，都往websocket发
    stream.on('data', (data) => {
        // let msg = sip_parsing.parse(data.toString());
        // let from = msg.headers.filter( (it: string[]) => it[0] == 'from')[0][1];
        // let to = msg.headers.filter( (it: string[]) => it[0] == 'to')[0][1];
        // console.log(`type: ${msg["$rm"]}, from: ${from}, to: ${to}`);
        // console.log(data.toString())
        // console.log(data.toString())
        socket.send(data);
    });
  
    return stream;
  }
  

wss.on('connection', (socket: ws.WebSocket) => {
    let stream: net.Socket | undefined ;

    socket.on('message', (data) => {
        let msg = sip_parsing.parse(data.toString());
        let from = msg.headers.filter( (it: string[]) => it[0] == 'from')[0][1];
        let to = msg.headers.filter( (it: string[]) => it[0] == 'to')[0][1];
        console.log(`type: ${msg["$rm"]}, from: ${from}, to: ${to}`);
        if (!stream) {
            stream = createStream(socket, {
            host: msg["$rp"],
            port: 5060,
            });

            // wss.emit('streamCreate', stream);
        }

        // 直接转发给sip服务器
        stream.write(data as any, 'binary');
        // wss.emit('transferData', data, stream);
    });

    socket.on('close', () => {
      wss.emit('disconnect', socket);
      if (stream) {
        // wss.emit('streamDestroy', stream);
        stream.destroy();
      }
    });

    // wss.emit('connect', socket);
  });


http_server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
