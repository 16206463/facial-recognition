<template>
  <div id="app">


<!--    <router-link to="/loginPage" tag="button"> {{loginPage}} </router-link>-->
<!--    <router-link to="/facialRecognition" tag="button" > {{examPage}} </router-link>-->
<!--    <router-link to="/userPage/" tag="button" > {{userPage}} </router-link>-->


    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        loginPage: 'login page',
        examPage:'exam page',
        userPage:'user page',
        //
        // activeIndex: '1',
        // activeIndex2: '1'
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);

      }
    }

}
</script>

<style lang="less">
  @import './style/common';
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
