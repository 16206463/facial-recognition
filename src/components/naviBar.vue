<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Login Page</el-menu-item>
    <el-menu-item index="2">User Page</el-menu-item>
    <el-menu-item index="3">Exam Page</el-menu-item>
    <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
  </el-menu>
  <div class="line"></div>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">Login Page</el-menu-item>
    <el-menu-item index="2">User Page</el-menu-item>
    <el-menu-item index="3">Exam Page</el-menu-item>
  </el-menu>

</template>

<script>
    export default {
      // name: "naviBar"
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
