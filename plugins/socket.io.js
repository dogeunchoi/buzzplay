import io from 'socket.io-client'
const socket = io(process.env.HOST || '127.0.0.1')

export default socket