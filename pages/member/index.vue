<template>
  <div>
      ready? {{ ready }}
      <button @click="onReady">{{ ready ? 'not ready...' : 'I am ready' }}</button>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import io from 'socket.io-client'
  const socket = io('http://localhost:3000')
  
  export default {
    head() {
      return {
        title: '스터디멤버'
      }
    },
    data() {
        return {
            ready: false
        }
    },
    methods: {
        onReady() {

        }
    }
  }
</script>

<style lang="scss" scoped>
  input[type='text'] {
    border: 1px solid #ddd;
  }
</style>
