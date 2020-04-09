<template>
  <div id="app">

    <div class="line"></div>
    <el-menu
      router
      :default-active="this.$router.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/loginPage" >Login Page</el-menu-item>
      <el-menu-item index="/userPage">User Page</el-menu-item>
      <el-menu-item index="/facialRecognition">Exam Page</el-menu-item>
    </el-menu>

    <!--<router-link to="/loginPage" tag="button"> {{loginPage}} </router-link>-->
    <!--<router-link to="/facialRecognition" tag="button" > {{examPage}} </router-link>-->
    <!--<router-link :to="'/userPage/'+userId" tag="button" > {{userPage}} </router-link>-->

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
  /*@import './style/common';*/
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
