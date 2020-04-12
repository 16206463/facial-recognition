<template>
	<div>
		<h1>user Page</h1>
    <h3>welcome  {{ username }}, now we need you to submit 10 pictures, please open your camera!!!!</h3>

    <button @click='deleteuser' >{{ deleteUserText }}</button>


    <div class="camera_outer">
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>


      <div class="btns">
        <button @click="getCompetence"> {{OpenTheCameraText}} </button>
        <button @click="setImage"> {{TakeAPictureText}} </button>
        <button @click="stopNavigator"> {{ CloseTheCameraText }} </button>
        <button @click="handleUpdata"> {{ uploadText }} </button>

        <button @click="train" v-if="Aftersubmit"> {{ ToExamPageText }} </button>

        <button @click="train" > {{ ToExamPageText }} </button>

        <button @click="threat">线程</button>

      </div>

      <img :src="imgSrc">

    </div>
	</div>


</template>

<script type="text/javascript">
  import axios from 'axios';

	export default{
		name: 'userPage',
    data(){
      return{
        username: '',
        videoWidth: 540,
        videoHeight: 410,
        imgSrc: '',
        thisVideo: null,
        thisCancas: null,
        thisContext: null,
        OpenTheCameraText: 'Open The Camera',
        TakeAPictureText: 'Take A Picture',
        CloseTheCameraText: 'Close The Camera',
        uploadText: 'upload',
        ToExamPageText: 'To Exam Page',
        deleteUserText: 'delete user',
        num: 0,
        Aftersubmit: false
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
            // config
          }).then(res=>{
            console.log(res);
            vueself.ImgFile=res.data;
          }).catch(err=>{
            vueself.$notify.error({
              title: '上传失败',
              message: err.msg
            });
          })
        }

        vueself.Aftersubmit = true
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
            console.log(res);
            this.ImgFile=res.data;
          }).catch(err=>{
            this.$notify.error({
              title: '上传失败',
              message: err.msg
            });
          })
        }
      },

      count() {
        console.log(1)
      },

      threat(){
        var index = 0;
        var num = 0
        if (index < 10000) {
          var _this = this
        var interval = setInterval(function () {
            if(num<10){
              index+=500;
              num +=1;

              _this.$options.methods.setImage10(_this)


              console.log(index + "这是第 "+num);
            }else{
              alert("已提交10张照片")
              clearInterval(interval);
            }
          }, 1000)
        }

      },

      train(){
        var parms=new FormData();
        parms.append('username',this.username); //train value 训练模型名字
        axios({
          url: '/dashboard/train',
          data: parms,
          method: 'POST'
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.info("err")
        });

        this.$router.push(
          {
            name: 'facialRecognition',
            params: {
              username: this.username,
              data: 1
            }
          });



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
  }

  img{
    width: 100%;
    height: 100%;
  }


</style>
