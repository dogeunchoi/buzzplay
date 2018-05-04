import io from 'socket.io-client'
const socket = io(('http://' + process.env.HOST + ':' + process.env.PORT) || 'http://127.0.0.1:3000')

export default socket