<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

<!--    <el-menu-->
<!--      :default-active="activeIndex2"-->
<!--      class="el-menu-demo"-->
<!--      mode="horizontal"-->
<!--      background-color="#545c64"-->
<!--      text-color="#fff"-->
<!--      active-text-color="#ffd04b">-->
<!--      <el-menu-item index="1">zl</el-menu-item>-->
<!--      <el-menu-item index="3" >冬DON-&#45;&#45;DDD</el-menu-item>-->
<!--      <el-menu-item index="4"><a href="" target="_blank">tianze</a></el-menu-item>-->
<!--    </el-menu>-->


    <input accept="image/*" name="img" id="upload_file" type="file">

    <div class="btn">
      <el-button type="primary" round @click="sendpic">保存</el-button>
    </div>

    <div>
      <el-button @click="gotolink" class='To' type="primary" >el按钮跳转</el-button>
    </div>

  </div>


</template>

<script>
  import axios from "axios";
export default {

  name: 'facialRecognition',
  data () {

    return {
      msg: '面部识别',
    };
  },
  methods: {

    gotolink(){
      //点击跳转至上次浏览页面
      //this.$router.go(-1)
      //指定跳转地址
      this.$router.push('/loginPage')
    },
    sendpic() {
      // var params = new URLSearchParams();
      // params.append('img', this.dialogImageUrl); //你要传给后台的参数值 key/value

      var file = document.getElementById("upload_file").files[0];
      var formdata1 = new FormData();// 创建form对象
      formdata1.append('img', file, file.name);// 通过append向form对象添加数据,可以通过append继续添加数据
      //添加请求头
      axios({
        url: 'http://localhost:8000/homepage/upload',
        data: formdata1,
        method: 'POST',
        // config
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
.uploadpic{
  margin: 20px;
}

.To{
  margin: 20px;
}
</style>
