<template>
  <div class="hello">
    <h1>Exam Page</h1>
    <h2>Hello   {{ username}} , this is exam page , do not leave this page when you are examming.</h2>


<!--    <input accept="image/*" name="img" id="upload_file" type="file">-->
<!--    <div class="btn">-->
<!--      <el-button type="primary" round @click="sendpic">{{ recogText }}</el-button>-->
<!--    </div>-->
    <el-input
      type="textarea"
      :rows="5"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>

    <div class="block">
      <p> The accuracy is {{ accuracy }}</p>
    </div>


    <div class="camera_outer">
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>
<!--      <img :src="imgSrc" width="100px" height="100px">-->
    </div>


    <div>
      <button @click="threat">  开始考试 </button>

    </div>

<!--    <img :src="imgSrc" width="100px" height="100px">-->

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
      recogText: 'recog',
      username: '',
      accuracy: '',
      videoWidth: 100,
      imgSrc: '',
      videoHeight: 100,
      textarea: '',
      adata: 0
    };
  },
  methods: {

    gotolink(){
      //点击跳转至上次浏览页面
      //this.$router.go(-1)
      //指定跳转地址
      this.$router.push('/loginPage')
    },

    //前端video投影人脸
    getCompetence () {
      var _this = this
      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')

      var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight } }

      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        _this.thisVideo.srcObject = stream
        _this.thisVideo.onloadedmetadata = function (e) {
          _this.thisVideo.play()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    //每隔20秒拍照  上传到后端识别
    threat(){
      console.log('开始i 考试')


      var index = 0;
      var num = 0
      if (index < 10000) {
        var _this = this
        var interval = setInterval(function () {
          if(num<50){
            index+=20000;
            num +=1;
            _this.$options.methods.RecogAuto(_this)

            console.log(index + "这是第 "+num+ new Date());
          }else{
            clearInterval(interval);
          }
        }, 20000)
      }

    },

    //base64转图片
    dataURLtoFile (dataurl, filename) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },

    //自动拍照上传照片
    RecogAuto (vueself) {

      vueself.thisContext.drawImage(vueself.thisVideo, 0, 0, vueself.videoWidth, vueself.videoHeight)
      // 获取图片base64链接
      var image = vueself.thisCancas.toDataURL('image/png')
      vueself.imgSrc = image
      vueself.$emit('refreshDataList', vueself.imgSrc)

      if (vueself.imgSrc!==''){
        let file = vueself.imgSrc; // 把整个base64给file
        let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
        let time=(new Date()).valueOf();//生成时间戳
        let name = new Date() + ".jpg"; // 定义文件名字

        let conversions = vueself.dataURLtoFile(file, name); // 调用base64转图片方法
        let parms=new FormData();
        parms.append('face',conversions,name);
        parms.append('username',vueself.username);   // 谁的10张照片
        axios({
          url: 'dashboard/rec',
          data: parms,
          method: 'POST',
          // config
        }).then(res=>{
          console.log(res);
          vueself.ImgFile=res.data;
          vueself.accuracy = res.data;
        }).catch(err=>{
          vueself.$notify.error({
            title: '上传失败',
            message: err.msg
          });
        })
      }
    },

    //老接口  用来选取文件中照片上传
      sendpic() {

      var file = document.getElementById("upload_file").files[0];
      var formdata1 = new FormData();// 创建form对象

      formdata1.append('face', file, file.name);// 通过append向form对象添加数据,可以通过append继续添加数据
      formdata1.append('username',this.username)

      axios({
        url: 'dashboard/rec',
        data: formdata1,
        method: 'POST',
        // config
      }).then((response) => {
        console.log(response);
        alert("Upload Success!");

        this.accuracyText = response.data
      })
        .catch((error) => {
          console.log(error);
        });

      document.getElementById("upload_file").value = ''
    },

    // 查找用户
    findusr() {
      var params = new URLSearchParams();
      params.append('username',this.username);
      axios({
        url: '/dashboard/find_user',
        method: 'POST',
        // data: params
      }).then(res => {
        console.log(res);
        this.msg = res;
      })
    },

    //老接口 返回图片的url路径
    recog() {
      // var params = new URLSearchParams();
      // params.append('username','oii');
      axios({
        url: '/dashboard/path',
        method: 'POST'

      }).then((res) => {

        console.info(res.data)
        this.piclist = res.data


      }).catch(error => {
        console.log("付子欣你网络请求错误", error);
      });
      this.play = true

    },

    //删除指定用户
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

  },


  mounted () {
    this.getCompetence()
    this.username = this.$route.params.username
    this.adata = this.$route.params.data
    console.log(this.adata)
  },
}
</script>


<style scoped>

  h2{
    margin: 10px;
  }

h1, h2 {
  font-weight: normal;
}

.To{
  margin: 20px;
}

.btn {
  margin: 50px;
}

#upload_file {
  margin: 50px;

}
</style>
