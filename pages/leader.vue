<template>
    <div>
        <div v-if="isLoaded">
            <div>
                STEP <input type="text" v-model="step" @keyup="onStepChanged">
            </div>
            <img :src="imgPath">
            <div style="margin: 10px 0;">
                <ul v-if="!isAllReady">
                    <li v-for="name in Object.keys(userStatus)" :key="name" :class="showStatuses ? (userStatus[name] ? 'pass' : 'working') : '' ">{{ name }}</li>
                </ul>
                <div v-else>
                    <h1>모두 완료!</h1>
                </div>
            </div>
            <div>
                <button v-if="!isAllReady" @click="toggleStatuses">상태표시 {{ showStatuses ? 'ON' : 'OFF' }}</button>
                <button @click="goToNextStep">다음스텝</button>
            </div>
        </div>
        <div v-else>loading...</div>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'
    import socket from '~/plugins/socket.io.js'

    // const successAudio = 
    // const resetAudio = new Audio('/reset.wav')
    
    export default {
        head() {
            return {
                title: '스터디 리더 전용'
            }
        },
        data() {
            return {
                isLoaded: false,
                ready: false,
                showStatuses: false,
                userStatus: {},
                step: 0
            }
        },
        computed: {
            userCounts() {
                return Object.keys(this.userStatus).length
            },
            readyCounts() {
                let readyCounts = 0
                for (let key of Object.keys(this.userStatus)) {
                    if (this.userStatus[key]) {
                        readyCounts++
                    }
                }
                return readyCounts
            },
            isAllReady() {
                return this.userCounts == this.readyCounts
            },
            imgPath() {
                if (this.isAllReady) {
                    return require('~/assets/img/sun.png')
                } else {
                    return require('~/assets/img/rain.png')
                }
            }
        },
        watch: {
            'isAllReady': function(isAllReady) {
                if (isAllReady) {
                    new Audio('/success.wav').play()
                }
            }
        },
        methods: {
            onStepChanged() {
                socket.emit('go to next step', {
                    step: this.step
                })

                new Audio('/reset.wav').play()
            },
            toggleStatuses() {
                this.showStatuses = !this.showStatuses
            },
            goToNextStep() {
                this.step ++
                this.onStepChanged()
                socket.emit('go to next step')
            }
        },
        beforeMount() {
            socket.on('leader entered', (data) => {
                this.isLoaded = true
                this.userStatus = data.userStatus
                this.step = data.step
            })
    
            socket.on('ready updated', (data) => {
                this.userStatus = data.userStatus
            })
    
            socket.emit('leader entered')
    
            socket.on('login', (data) => {
                this.userStatus = data.userStatus
            })
    
            socket.on('logout', (data) => {
                this.userStatus = data.userStatus
            })
        },
    }
</script>

<style lang="scss" scoped>
    input[type='text'] {
        border: 1px solid #ddd;
    }
    
    img {
        width: 50%;
        max-width: 300px;
    }
    
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 2px 10px;
            margin: 3px;
            display: inline-block;
            &.pass {
                background-color: #bcebf3;
            }
            &.working {
                background-color: #f3bcbc;
            }
        }
    }
    
    button {
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 12px 20px;
        font-size: 1.0rem;
        font-weight: 600;
        margin: 5px;
        margin-top: 0;
        cursor: pointer;
        outline: none;
    }
    
    input[type='text'] {
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 6px;
        font-size: 1.0rem;
        margin: 10px;
        width: 30px;
        text-align: right;
    }
</style>
