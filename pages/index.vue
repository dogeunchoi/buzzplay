<template>
  <section class="container">
    <div class="form-group">
      <form @submit.prevent="onSubmit">
        <label for="name">이름</label>
        <input type="text" class="form-control" id="name" v-model="name">
        <button type="submit">입장</button>
      </form>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import io from 'socket.io-client'
  const socket = io('http://localhost:3000')
  
  export default {
    head() {
      return {
        title: '코딩스터디'
      }
    },
    data() {
      return {
        name: ''
      }
    },
    methods: {
      onSubmit(f) {
        socket.emit('enter', {
          name: this.name
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  input[type='text'] {
    border: 1px solid #ddd;
  }
</style>
