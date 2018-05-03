<template>
  <section class="container">
    <div class="form-group">
      <form @submit.prevent="onSubmit">
        <label for="name">너의 이름은?</label>
        <div><input type="text" class="form-control" id="name" v-model="name" /></div>
        <div><button type="submit">입장</button></div>
      </form>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import socket from '~/plugins/socket.io.js'
  
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
        this.$router.push({
          name: 'member',
          query: {
            name: this.name
          }
        })
      },
      destroyed() {
        socket.emit('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  input[type='text'] {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    font-size: 1.5rem;
    margin: 10px;
    max-width: 180px;
  }
  
  button {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 12px 20px;
    font-size: 1.0rem;
    font-weight: 600;
    margin: 10px;
    margin-top: 0;
    cursor: pointer;
  }
  
  .container {
    color: #666;
    font-size: 2rem;
    label {
      font-weight: 600;
    }
  }
</style>
