<template>
  <div id="app">
    <!-- <img src="./assets/dogpic.jpg"  width="300" height="280"> -->
     
    <router-link to="/loginPage" tag="button"> 登陆页 </router-link>
    <router-link to="/facialRecognition" tag="button" > 识别页 </router-link>
    <router-link :to="'/userPage/'+userId" tag="button" > 用户页 </router-link>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'zl',
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
