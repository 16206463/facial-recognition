<template>
  <div class="hello">
    <h1>Exam Page</h1>
    <h2>Hello   {{ username}} , this is exam page , do not leave this page when you are examming.</h2>

    <div class="block">
      <p> The accuracy is {{ accuracy }}</p>
    </div>

    <div class="camera_outer">
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>
    </div>
    <div>
      <button @click="thread">  开始考试 </button>
    </div>

    <div  v-if="test">
      <text :value="code"></text>

      <codemirror ref="myCm"
                  :value="code"
                  :options="cmOptions"
                  @ready="onCmReady"
                  @focus="onCmFocus"
                  @input="onCmCodeChange"

      class="code">
      </codemirror>

<!--      <textarea ref="myCm"-->
<!--                  :value="code"-->
<!--                  :options="cmOptions"-->
<!--                  @ready="onCmReady"-->
<!--                  @focus="onCmFocus"-->
<!--                  @input="onCmCodeChange"-->
<!--                  class="code">-->
<!--      </textarea>-->


      <el-button round type="primary" @click="Submit">  test  </el-button>

      <div class="resultShow">
        <p>  Console : </p>
        <textarea :value="result"></textarea>
      </div>

    </div>



  </div>

</template>

<script>
  import axios from "axios";

  import { codemirror } from 'vue-codemirror'
  require("codemirror/mode/python/python.js")


  // import "codemirror/theme/ambiance.css";
  // import "codemirror/lib/codemirror.css";
  // import "codemirror/addon/hint/show-hint.css";
  //
  // let CodeMirror = require("codemirror/lib/codemirror");
  //
  // require("codemirror/mode/python/python.js")
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/selection/active-line");
  require("codemirror/addon/hint/show-hint");


  import Edit from './edit'
  import Running from './running'

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
      videoWidth: 500,
      imgSrc: '',
      videoHeight: 500,
      textarea: '',
      adata: 0,
      test: false,
      code: '',
      curCode:'',
      result:'',
      cmOptions:{
        tabSize: 4,
        mode: 'text/x-python',
        lineNumbers: true,
        line: true,
        indentWithTabs: true,
        smartIndent: true,
        extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键

        indentUnit: 4, // 智能缩进单位为4个空格长度
        lineWrapping: true, //
        // // 在行槽中添加行号显示器、折叠器、语法检测器
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        foldGutter: true, // 启用行槽中的代码折叠
        autofocus: true, // 自动聚焦
        matchBrackets: true, // 匹配结束符号，比如"]、}"
        autoCloseBrackets: true, // 自动闭合符号
        styleActiveLine: true,
      }
    };
  },
  components: {
    codemirror,
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    },

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
    thread(){
      console.log('开始i 考试')

      if(this.test == false){
        this.test = true
      }

      var index = 0;
      var num = 0
      if (index < 10000) {
        var _this = this
        var interval = setInterval(function () {
          if(num<50){
            index+=5000;
            num +=1;
            _this.$options.methods.RecogAuto(_this)

            console.log(index + "这是第 "+num+ new Date());
          }else{
            clearInterval(interval);
          }
        }, 5000)
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
    },
    running () {
      this.$refs.run.reset()
      this.$refs.run.buildDom()
    },

    Submit(){

      console.log(this.code)
      var params = new FormData();// 创建form对象
      params.append('code', this.code.toString());
      axios({
        url: '/dashboard/ide',
        method: 'POST',
        data: params
      }).then(res => {
        console.log(res);
        this.result = res.data
      })

    }

  },


  mounted () {
    this.getCompetence()
    this.username = this.$route.params.username
    this.adata = this.$route.params.data
    console.log(this.adata)

    console.log('this is current codemirror object', this.codemirror)

  },

  // computed: {
  //   codemirror() {
  //     return this.$refs.myCm.codemirror
  //   }
  // }
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

  .code {
    font-size: 11pt;
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  }
  .resultShow {
  border: 1px solid green
  }
</style>
