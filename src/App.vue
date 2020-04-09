<template>
  <div id="app">
    <!-- < img src="./assets/dogpic.jpg"  width="300" height="280"> -->

    <router-link to="/loginPage" tag="button"> {{loginPage}} </router-link>
    <router-link to="/facialRecognition" tag="button" > {{examPage}} </router-link>
    <router-link :to="'/userPage/'+userId" tag="button" > {{userPage}} </router-link>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        userId: 'zl',
        loginPage: 'login page',
        examPage:'exam page',
        userPage:'user page'
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .router-link-active{
    color: red;
  }
</style>
