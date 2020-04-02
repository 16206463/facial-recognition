<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <input accept="image/*" name="img" id="upload_file" type="file">

    <div class="btn">
      <el-button type="primary" round @click="sendpic">保存</el-button>
    </div>

    <div>
      <el-button @click="recog" class='To' type="primary" >跳转</el-button>
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

      var file = document.getElementById("upload_file").files[0];
      var formdata1 = new FormData();// 创建form对象
      formdata1.append('img', file, file.name);// 通过append向form对象添加数据,可以通过append继续添加数据

      axios({
        url: '/homepage/upload',
        data: formdata1,
        method: 'POST',
        // config
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        });
    },
// 查找用户
    findusr() {
      var params = new URLSearchParams();
      params.append('username','zl');
      axios({
        url: '/dashboard/find_user',
        method: 'POST',
        // data: params
      }).then(res => {
        console.log(res);
        this.msg = res;
      })
    },

    recog() {
      // var params = new URLSearchParams();
      // params.append('username','oii');
      axios({
        url: '/dashboard/path',
        method: 'GET'
        // url: 'http://123.207.32.32:8000/home/multidata'
        // data: params
      }).then(res => {
        console.log(res);
        this.msg = res;
      }).catch(error => {
        console.log("网络请求错误", error);
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
