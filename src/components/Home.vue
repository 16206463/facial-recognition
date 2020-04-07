<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <input accept="image/*" name="img" id="upload_file" type="file">

    <div class="btn">
      <el-button type="primary" round @click="sendpic">{{ recogText }}</el-button>
    </div>


    <div class="block">
      <p> The accuracy is {{ accuracy }}</p>
    </div>

  </div>

</template>

<script>
  import axios from "axios";
export default {


  name: 'facialRecognition',
  data () {

    return {
      msg: 'facial recognition',
      piclist: [],
      picsize: 0,
      hit: '',
      play: false,
      accuracy: '',

      recogText: 'recognition'
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
      formdata1.append('face', file, file.name);// 通过append向form对象添加数据,可以通过append继续添加数据
      formdata1.append('username','aa')

      axios({
        url: '/dashboard/rec',
        data: formdata1,
        method: 'POST',
        // config
      }).then((response) => {
        console.log(response);

        alert("Upload Success!");

        this.accuracy = response.data
      })
        .catch((error) => {
          console.log(error);
        });

      document.getElementById("upload_file").value = ''
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
      axios({
        url: '/dashboard/path',
        method: 'POST'
      }).then((res) => {
        // this.piclist = res.data.toString().split('@@@');
        // this.picsize = this.piclist.length - 1;
        // console.log(this.piclist)
        // this.hit = this.piclist[0]
        // console.log(this.hit)
        // this.msg = res.data.toString();


        console.info(res.data)

        // console.info(this.piclist.length)


      }).catch(error => {
        console.log("付子欣你网络请求错误", error);
      });

    },

    delusr() {
      var params = new URLSearchParams();
      params.append('username','oii');
      axios({
        url: '/dashboard/delete_user',
        method: 'POST'
        // url: 'http://123.207.32.32:8000/home/multidata'
        // data: params
      }).then(res => {


      })
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

.btn {
  margin: 50px;
}

#upload_file {
  margin: 50px;

}
</style>
