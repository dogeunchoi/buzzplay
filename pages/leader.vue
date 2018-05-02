<template>
    <div>
        members {{ userCounts }}<br/>
        {{ userLists }}
    </div>
</template>

<script>
    import axios from '~/plugins/axios'
    import io from 'socket.io-client'
    const socket = io('http://localhost:3000')
    
    export default {
        head() {
            return {
                title: '스터디 리더 전용'
            }
        },
        data() {
            return {
                ready: false,
                userCounts: 5,
                userLists: []
            }
        },
        methods: {
            onReady() {
    
            }
        },
        beforeMount() {
            socket.on('leader entered', (data) => {
                console.log('@leader entered', data)
                this.userCounts = data.userCounts
                this.userLists = data.userLists.slice(0)
            })

            socket.on('login', (data) => {
                console.log('@login', data)
                this.userCounts = data.userCounts
                this.userLists = data.userLists.slice(0)
            })

            socket.on('logout', (data) => {
                console.log('@logout', data)
                this.userCounts = data.userCounts
                this.userLists = data.userLists.slice(0)
            })
        },
        created() {
            
        },
        destroyed() {
            socket.off()
            socket.disconnect()
        }
    }
</script>

<style lang="scss" scoped>
    input[type='text'] {
        border: 1px solid #ddd;
    }
</style>
