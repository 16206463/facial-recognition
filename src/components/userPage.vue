<template>
	<div>
		<h1>user Page</h1>
		<h2>{{ $route.params.userId }}</h2>
    <h3>{{ message }}</h3>
<!--    <button @click='ky' >c跨域csdn</button>-->
    <button @click='deleteuser' >删除用户</button>


    <div class="camera_outer">
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>


      <button @click="getCompetence"> 打开相机 </button>
      <button @click="setImage"> 拍照 </button>
      <button @click="stopNavigator"> 停 </button>
      <button @click="handleUpdata"> 上传 </button>

      <button @click="train"> 跳转考试页 </button>

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
        message: '',
        videoWidth: 540,
        videoHeight: 410,
        imgSrc: '',
        thisVideo: null,
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
          let name = this.num + ".jpg"; // 定义文件名字（例如：abc.png ， cover.png）
          this.num += 1
          let conversions = this.dataURLtoFile(file, name); // 调用base64转图片方法
          let parms=new FormData();
          parms.append('face',conversions,name);
          parms.append('username','zl');
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

      train(){
        var parms=new FormData();
        parms.append('username','zl');
        axios({
          url: '/dashboard/train',
          data: parms,
          method: 'POST'
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.info("err")
        })

        this.$router.push('/facialRecognition')
      }
    },
    mounted () {
      this.getCompetence()
    },
    beforeDestroy () {
      this.stopNavigator()
    }

	}
</script>

<style type="text/css">
  .camera_outer {
    position: relative;
    overflow: hidden;
    background-size: 100%;

  }
  video,canvas,.tx_img{
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
