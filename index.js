const express = require('express');
const cors = require('cors');
const net = require('net');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');

app.use(cors())
app.use(express.static(__dirname));

const wss = new WebSocket.Server({ server: http });


function createStream(socket, {
    host, port, timeout, maxListeners, callback,
  }) {
    const stream = net.connect(port, host);
  
    stream.setEncoding('binary');
    if (timeout !== undefined) {
      stream.setTimeout(timeout);
    }
    if (maxListeners !== undefined) {
      stream.setMaxListeners(maxListeners);
    }
  
    // sip回来的数据，都往websocket发
    stream.on('data', (data) => {
    //   if (callback) {
    //     const result = callback(data, stream);
    //     if (result === false) {
    //       return;
    //     }
    //   }
      socket.send(data);
      console.log(`sip回来:
${data.toString()}`);
    });
  
    return stream;
  }
  

wss.on('connection', (socket) => {
    let stream;

    socket.on('message', (data) => {
      if (!stream) {
        stream = createStream(socket, {
          host: 'sip.linphone.org',
          port: 5060,
        });

        wss.emit('streamCreate', stream);
      }
      console.log(`发往sip:
${data.toString()}`);

      // 直接转发给sip服务器
      stream.write(data, 'binary');
      wss.emit('transferData', data, stream);
    });

    socket.on('close', () => {
      wss.emit('disconnect', socket);
      if (stream) {
        wss.emit('streamDestroy', stream);
        stream.destroy();
      }
    });

    wss.emit('connect', socket);
  });

// wss.on('connection', (ws) => {
//     console.log('A user connected');
  
//     // 处理来自客户端的消息
//     ws.on('message', (message) => {
//       console.log('Received message:', message.toString());
  
//       // 将消息广播给所有连接的客户端
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(message.toString());
//         }
//       });
//     });
  
//     // 处理断开连接
//     ws.on('close', () => {
//       console.log('A user disconnected');
//     });
// });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });
  

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});
  