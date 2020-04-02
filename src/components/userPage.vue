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
      <button @click="pick"> 拍照 </button>
      <button @click="stopNavigator"> 停 </button>

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

      pick(){

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
