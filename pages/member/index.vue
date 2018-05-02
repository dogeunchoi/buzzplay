<template>
  <div>
    <h2><u>STEP {{ step }}</u></h2><br/>
    <img :src="imgPath" @click="onReady"><br/>
    <b>{{ name }}</b>님
    <h3>{{ !ready ? '준비됐으면 Buzzer를 누르세요!' : '준비가 덜 됐으면 Buzzer를 누르세요.' }}</h3>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import socket from '~/plugins/socket.io.js'
  
  export default {
    head() {
      return {
        title: '스터디멤버'
      }
    },
    data() {
      return {
        ready: false,
        name: '',
        step: 0
      }
    },
    computed: {
      imgPath() {
        if (this.ready) {
          return require('~/assets/img/green_light.png')
        } else {
          return require('~/assets/img/red_light.png')
        }
      }
    },
    methods: {
      onReady() {
        if (this.ready) {
          this.ready = false
          socket.emit('user chagned ready status', {
            ready: false
          })
        } else {
          this.ready = true
          socket.emit('user chagned ready status', {
            ready: true
          })
        }
      }
    },
    created() {
      this.name = this.$route.query.name
    },
    beforeMount() {
      socket.emit('enter', {
        name: this.name
      })
  
      socket.on('initilize status', (data) => {
        this.ready = false
        this.step = data.step
        socket.emit('user chagned ready status', {
          ready: false
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  input[type='text'] {
    border: 1px solid #ddd;
  }
  
  img {
    width: 50%;
    max-width: 300px;
    cursor: pointer;
  }
</style>
