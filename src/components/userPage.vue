<template>
	<div>

    <h1>User Page</h1>

    <el-steps :active="2">
      <el-step title="步骤 1" icon="el-icon-user"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-edit"></el-step>
    </el-steps>

    <h3>Welcome  {{ username }} <el-button @click='deleteuser' type="danger" icon="el-icon-delete" circle size="small"></el-button> , you need to take 100 pictures, please open your camera!!!!</h3>

    <div class="camera_outer">
      <div class="btns">
        <el-button-group>
          <el-button @click="thread" type="primary" class="btn"> {{StartText}} <i class="el-icon-picture-outline-round"></i></el-button>
          <el-button @click="to" type="primary"> to </el-button>
          <el-button @click="train" type="primary" class="btn" v-if="Aftersubmit"> {{ ToExamPageText }} <i class="el-icon-d-arrow-right"></i></el-button>
        </el-button-group>
      </div>

      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>
      <img :src="imgSrc">

    </div>
	</div>


</template>

<script type="text/javascript">
  import axios from 'axios';
  import { Loading } from 'element-ui';

	export default{
		name: 'userPage',
    data(){
      return{
        username: '',
        videoWidth: 600,
        videoHeight: 410,
        imgSrc: '',
        thisVideo: null,
        thisCancas: null,
        thisContext: null,
        StartText: 'Start ',
        TakeAPictureText: 'Add Picture ',
        uploadText: 'Upload ',
        ToExamPageText: 'Exam Page ',
        num: 0,
        Aftersubmit: false,
        loading: true
      }
    },

    computed: {
    },
    methods: {

      deleteuser() {
        console.log('click')

        axios({
          url: '/dashboard/delUser',
          method: 'POST'
        }).then(res => {
          console.log(res);
          this.message = res
        })

      },

      getCompetence () {
        var _this = this
        this.thisCancas = document.getElementById('canvasCamera')
        this.thisContext = this.thisCancas.getContext('2d')
        this.thisVideo = document.getElementById('videoCamera')
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play()
          }
        }).catch(err => {
          console.log(err)
        })
      },



      stopNavigator () {
        this.thisVideo.srcObject.getTracks()[0].stop()
      },

      setImage () {
        var _this = this
        // 点击，canvas画图
        _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
        // 获取图片base64链接
        var image = this.thisCancas.toDataURL('image/png')
        _this.imgSrc = image
        this.$emit('refreshDataList', this.imgSrc)
      },
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
      handleUpdata(){//已form提交
        if (this.imgSrc!==''){
          let file = this.imgSrc; // 把整个base64给file
          let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
          let time=(new Date()).valueOf();//生成时间戳
          let name = this.num + ".jpg"; // 定义文件名字
          this.num += 1
          let conversions = this.dataURLtoFile(file, name); // 调用base64转图片方法
          let parms=new FormData();
          parms.append('face',conversions,name);
          parms.append('username',this.username);   // 谁的10张照片
          axios({
            url: '/dashboard/set',
            data: parms,
            method: 'POST',
            // config
          }).then(res=>{
            // console.log(res);
            this.ImgFile=res.data;
          }).catch(err=>{
            this.$notify.error({
              title: '上传失败',
              message: err.msg
            });
          })
        }
      },

      setImage10 (vueself) {

        // 点击，canvas画图
        vueself.thisContext.drawImage(vueself.thisVideo, 0, 0, vueself.videoWidth, vueself.videoHeight)
        // 获取图片base64链接
        var image = vueself.thisCancas.toDataURL('image/png')
        vueself.imgSrc = image
        vueself.$emit('refreshDataList', vueself.imgSrc)

        if (vueself.imgSrc!==''){
          let file = vueself.imgSrc; // 把整个base64给file
          let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
          let time=(new Date()).valueOf();//生成时间戳

          let name = vueself.num + ".jpg"; // 定义文件名字
          vueself.num += 1

          let conversions = vueself.dataURLtoFile(file, name); // 调用base64转图片方法
          let parms=new FormData();
          parms.append('face',conversions,name);
          parms.append('username',vueself.username);   // 谁的10张照片
          axios({
            url: '/dashboard/set',
            data: parms,
            method: 'POST',
          }).then(res=>{
            // console.log(res);
            vueself.ImgFile=res.data;
            if(res.data == 100){
              vueself.Aftersubmit = true
            }else if (res.data == 'Restart'){
              this.$message({
                message: '警告哦，重来亿次',
                type: 'warning'
              });
            }
          }).catch(err=>{
            vueself.$notify.error({
              title: '上传失败',
              message: err.msg
            });
          })
        }
      },

      check(){
        let param =new FormData();
        param.append('username',this.username)
        axios({
          url:'dashboard/check',
          method: 'post',
          data: param
        }).then(res=>{
          console.log(res);
        })
      },

      thread(){

        this.num = 0;
        this.$message('Please look around');
        var index = 0;
        var num = 0
        if (index < 10000) {
          var _this = this
        var interval = setInterval(function () {
            if(num<100){
              index+=100;
              num +=1;
              _this.$options.methods.setImage10(_this)
              // console.log(index + "这是第 "+num);
            }else{
              alert("you have submitted 100 pictures")
              clearInterval(interval);
            }
          }, 100)
        }

      },

      train(){
        let loadingInstance = Loading.service({ fullscreen: true });
        var parms=new FormData();
        parms.append('username',this.username); //train value 训练模型名字
        axios({
          url: '/dashboard/train',
          data: parms,
          method: 'POST'
        }).then(res=>{

            if(res.data == "train successfully") {

              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
              });
              this.$router.push(
                {
                  name: 'question',
                  params: {
                    studentID: this.username,
                    data: 1
                  }
                });
            }
        }).catch(err=>{
          console.info("err")
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });

      },
      to() {
        this.$router.push(
          {
            name: 'question',
            params: {
              studentID: '123321',
              data: 1
            }
          })
      }
    },

    beforeDestroy () {
      this.stopNavigator()
    },
    mounted () {
      this.getCompetence()
      this.username = this.$route.params.username
      console.log(this.username)
    },

	}
</script>

<style type="text/css">
  .camera_outer {
    position: relative;
    overflow: hidden;
    background-size: 100%;

  }
  video,canvas{
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-top: 50px;
    margin-right: 20px;
    background-color: #9DD3FA;
  }

  img{
    width: 600px;
    height: 410px;
    margin-left: 20px;
    background-color: #9DD3FA;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }


  h3{
    margin: 10px;
  }


  .btn{
    background-color: #1F6FB5;
  }



</style>
