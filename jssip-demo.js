var socket = new JsSIP.WebSocketInterface('ws://localhost:3000');
socket.via_transport = "tcp";
var configuration = {
  sockets  : [ socket ],
  uri      : 'sip:sunwu511@sip.linphone.org',
  password : 'frank'
};

var ua = new JsSIP.UA(configuration);

ua.start();

// Register callbacks to desired call events
var eventHandlers = {
  'progress': function(e) {
    console.log('call is in progress');
  },
  'failed': function(e) {
    console.log('call failed with cause: ', e);
  },
  'ended': function(e) {
    console.log('call ended with cause: ', e);
  },
  'confirmed': function(e) {
    console.log('call confirmed');
  }
};

var options = {
  'eventHandlers'    : eventHandlers,
  'mediaConstraints' : { 'audio': true, 'video': false }
};

// var session = ua.call('sip:bob@example.com', options);