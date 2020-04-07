<template>
  <div id="app">
    <!-- <img src="./assets/dogpic.jpg"  width="300" height="280"> -->

    <router-link to="/loginPage" tag="button"> {{ loginPageText }} </router-link>
    <router-link to="/facialRecognition" tag="button" > {{ examPageText }} </router-link>
    <router-link :to="'/userPage/'+userId" tag="button" > {{ profileText }} </router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'zl',
      loginPageText: 'login page',
      examPageText: 'exam page',
      profileText: 'user page'
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
