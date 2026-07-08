const io = require('socket.io-client');

const socket = io('http://localhost:4000', {
  transports: ['websocket'],
  reconnection: false
});

socket.on('connect', () => {
  console.log('✅ Socket.io connected');
  socket.emit('chat:join', { visitorId: 'test-visitor-' + Date.now() });
});

socket.on('chat:session', (data) => {
  console.log('✅ Chat session received:', data.sessionId);
  socket.emit('chat:message', { content: 'Test message from integration check' });
});

socket.on('chat:message', (msg) => {
  console.log('✅ Message received:', msg.content);
  socket.disconnect();
});

socket.on('connect_error', (err) => {
  console.error('❌ Socket connection error:', err.message);
  process.exit(1);
});

socket.on('disconnect', () => {
  console.log('✅ Socket disconnected cleanly');
  process.exit(0);
});

setTimeout(() => {
  console.error('❌ Socket test timeout');
  process.exit(1);
}, 10000);
