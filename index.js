const express = require('express');
const cors = require('cors');
const net = require('net');
const sip_parsing = require('sip-parsing')
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
    sip_parsing.parse(data.toString());
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
  
http.listen(3000, () => {
    console.log('Server listening on port 3000');
});
  