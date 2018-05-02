import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import http from 'http'
import socketio from 'socket.io'

import api from './api'

const app = express()
const server = http.Server(app)
const io = socketio(server)

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

let userCounts = 0
let userLists = []

io.on('connection', (socket) => {
    let isEntered = false

    socket.on('enter', (data) => {
        if (!isEntered) {
            userCounts++
            socket.name = data.name
            userLists.push(socket.name)
        }

        isEntered = true

        socket.broadcast.emit('login', { userCounts, name: data.name, userLists })
    })

    socket.broadcast.emit('leader entered', { userCounts, userLists })

    socket.on('disconnect', () => {
        if (isEntered) {
            userCounts--
            for (let i = 0; i < userLists.length; i++) {
                if (userLists[i] == socket.name) {
                    userLists.splice(i, 1)
                    break
                }
            }
            socket.broadcast.emit('logout', { userCounts, name: socket.name, userLists })
        }
    })
})