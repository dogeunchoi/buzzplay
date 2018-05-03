import express from 'express'
import {
    Nuxt,
    Builder
} from 'nuxt'

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

let userStatus = {}
let step = 0

io.on('connection', (socket) => {
    let isEntered = false

    socket.on('enter', (data) => {
        if (isEntered) {
            try {
                delete userStatus[socket.name]
            } catch (err) {}
        }

        socket.name = data.name
        socket.ready = false
        userStatus[socket.name] = false

        isEntered = true

        socket.broadcast.emit('login', {
            name: socket.name,
            userStatus,
            step
        })

        socket.emit('initilize status', {
            step
        })
    })

    socket.on('leader entered', (data) => {
        io.emit('leader entered', {
            userStatus,
            step
        })
    })

    socket.on('go to next step', (data) => {
        if (data && data.step) {
            step = data.step
        }

        socket.broadcast.emit('initilize status', {
            step
        })
    })

    socket.on('user chagned ready status', (data) => {
        if (isEntered) {
            socket.ready = data.ready
            userStatus[socket.name] = socket.ready

            socket.broadcast.emit('ready updated', {
                userStatus
            })
        }
    })

    socket.on('logout', () => {
        if (isEntered) {
            delete userStatus[socket.name]

            socket.broadcast.emit('logout', {
                name: socket.name,
                userStatus
            })
        }
    })

    socket.on('disconnect', () => {
        if (isEntered) {
            delete userStatus[socket.name]

            socket.broadcast.emit('logout', {
                name: socket.name,
                userStatus
            })
        }
    })
})