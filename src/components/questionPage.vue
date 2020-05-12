<template>
  <div class="hello">

      <h1>Exam Page</h1>

    <el-steps :active="3">
      <el-step title="Step 1" icon="el-icon-user"></el-step>
      <el-step title="Step 2" icon="el-icon-upload"></el-step>
      <el-step title="Step 3" icon="el-icon-edit"></el-step>
    </el-steps>

      <div class="camera_outer">
        <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
        <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>
      </div>


    <h2>Hello   {{ studentID }} , this is exam page , do not leave this page when you are examming.</h2>


    <div>
      <el-button type="primary" @click="thread">Start Exam</el-button>
    </div>

    <div v-if="startExam">
      <h3 style="margin: 20px"> {{ questionList[index] }} </h3>

      <div>
        <el-row :gutter="60" class="txt">
          <el-col :span="11" :offset="1">
            <text :value="code"></text>

            <codemirror ref="myCm"
                        :value="code"
                        :options="cmOptions"
                        @ready="onCmReady"
                        @focus="onCmFocus"
                        @input="onCmCodeChange"
                        class="code">
            </codemirror>
          </el-col>

          <el-col :span="11">
            <div class="resultShow">
              <p>  The result is : </p>
              <textarea :value="result"></textarea>
            </div>
          </el-col>
        </el-row>

        <el-button round type="primary" @click="Submit" v-if="showB">  Run  </el-button>
        <el-button round type="primary" @click="to">  next question  </el-button>

        <el-button round type="primary" @click="pre" >  pre </el-button>

      </div>

    </div>


  </div>

</template>

<script>
  import axios from "axios";

  import { codemirror } from 'vue-codemirror'
  require("codemirror/mode/python/python.js")


  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/selection/active-line");
  require("codemirror/addon/hint/show-hint");


export default {


  name: 'facialRecognition',
  data () {

    return {
      msg: 'facial recognition',
      questionList: [

        'Q1: Please write a function to calculate and output the length of string "fzx likes playing game".',

        'Q2: Given a list[1, 2, 3]. Please write a function to calculate and output the length of this list.',

        'Q3: Given a dictionary{a:1, b:2}. Please write a function to calculate and output the length of this dictionary.',

        'Q4: It is known that it takes one cycle for a cell to divide into two cells, assuming that all cells do not die. How many period does it take to separate 1024 cells from 1 cell?',

        'Q5: Please design a sort algorithm that sort and return the list [5,4,3,2,1] from small to large.',

      ],
      index: 0,
      nextpageText: false,
      studentID: '',
      piclist: [],
      quesresult: '',
      picsize: 0,
      hit: '',
      play: false,
      recogText: 'recog',
      username: '',
      accuracy: '',
      videoWidth: 180,
      imgSrc: '',
      videoHeight: 150,
      textarea: '',
      adata: 0,
      test: false,
      SS: false,
      code: '',
      curCode:'',
      still: true,
      result:'',
      showB: true,
      startExam: false,
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

    //每隔20秒拍照  上传到后端识别
    thread(){
      console.log('开始考试')

      this.startExam = true

      if(this.test == false){
        this.test = true
      }

      var index = 0;
      var num = 0
      if (index < 100000  ) {
        var _this = this
        var interval = setInterval(function () {
          if(num<50  && _this.still == true ){
            index+=10000;
            num +=1;
            _this.$options.methods.RecogAuto(_this)

            console.log(index + "这是第 "+num+ new Date());
          }else{
            clearInterval(interval);
          }
        }, 10000)
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

      vueself.showB = false


      vueself.thisContext.drawImage(vueself.thisVideo, 0, 0, vueself.videoWidth, vueself.videoHeight)
      // 获取图片base64链接
      var image = vueself.thisCancas.toDataURL('image/png')
      vueself.imgSrc = image
      vueself.$emit('refreshDataList', vueself.imgSrc)

      if (vueself.imgSrc!==''){


        let file = vueself.imgSrc; // 把整个base64给file
        let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
        let myDate = new Date();

        let hour = myDate.getHours();
        let minutes = myDate.getMinutes();
        let sec =myDate.getSeconds();
        //let time=().valueOf();//生成时间戳
        let name = 'hh'+hour.toString()+'mm'+minutes.toString()+ 'ss' +sec.toString() + ".jpg"; // 定义文件名字

        console.log(name + 'fff$$$$')
        let conversions = vueself.dataURLtoFile(file, name); // 调用base64转图片方法
        let parms=new FormData();
        parms.append('face',conversions,name);
        parms.append('username',vueself.studentID);   // 谁的10张照片
        axios({
          url: 'dashboard/rec',
          data: parms,
          method: 'POST',
          // config
        }).then(res=>{
          vueself.showB = true
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
      formdata1.append('username',this.studentID)

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
      params.append('username',this.studentID);
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
        //第一题结果比对
        if (res.data == '18\n' && this.index == 0){
          this.quesresult == 'true'
          this.$options.methods.setImage(this);
          this.$options.methods.handleUpdata(this,true);
          //加显示颜色正确结果
        }
        else if(res.data == '3\n' && this.index == 1){

          this.quesresult == 'true'

          this.$options.methods.setImage(this);
          this.$options.methods.handleUpdata(this,true);
          //加显示颜色
        }else if(res.data == '2\n' && this.index == 2){

          this.quesresult == 'true'
          this.$options.methods.setImage(this);
          this.$options.methods.handleUpdata(this,true);
          //加显示颜色
        }else if(res.data == '10\n' && this.index == 3){

          this.quesresult == 'true'
          this.$options.methods.setImage(this);
          this.$options.methods.handleUpdata(this,true);
          //加显示颜
        }else if(res.data == '[1,2,3,4,5]\n' && this.index == 4){

          this.quesresult == 'true'
          this.$options.methods.setImage(this);
          this.$options.methods.handleUpdata(this,true);
          //加显示颜色
        }
        else{

          this.quesresult == 'false'

          console.log(' 结果错误 '+this.quesresult + '&&&&' +res.data+1)
          this.$options.methods.setImage(this);
          this.$options.methods.handleUpdata(this,false);
        }

      })

    },


    setImage (vueself) {
      var _this = vueself
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
      // 获取图片base64链接
      var image = _this.thisCancas.toDataURL('image/png')
      _this.imgSrc = image
      _this.$emit('refreshDataList', _this.imgSrc)
    },
    dataURLtoFile1 (dataurl, filename) {
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
    handleUpdata(vueself,boolean){//已form提交

        let file = vueself.imgSrc; // 把整个base64给file
        let type = "image/jpeg"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
        let time=(new Date()).valueOf();//生成时间戳
        let name = time + ".jpg"; // 定义文件名字
        let conversions = vueself.dataURLtoFile1(file, name); // 调用base64转图片方法
        let parms=new FormData();
        parms.append('face',conversions,name);

        parms.append('username',vueself.studentID);

        console.log(vueself.studentID + ' !@@@@@@@! ')
        console.log('@@@@@@@@@@@@@@@ '+ vueself.quesresult + ' $%&*(&*&^*&^%^&%$&^%$')
        parms.append('question',vueself.index);

        if(boolean === true){
          parms.append('result','true');
        }else{
          parms.append('result','false');
        }

        axios({
          url: '/dashboard/emotion',
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

    },
    to()
    {

      var params = new FormData();// 创建form对象
      params.append('username', this.studentID);
      params.append('question', this.index);

      axios({
        url: '/dashboard/next',
        method: 'POST',
        data: params
      }).then((res) => {
        console.log('sdfsadfadfas' + res.data)

        if(res.data == 1){
          if(this.index < 4){
            this.index += 1
            this.code = ''
            this.result = ''
            this.nextpageText = true
          } else {
            this.still = false
            var params = new FormData();// 创建form对象
            params.append('username', this.studentID);
            axios({
              url: '/dashboard/finish',
              method: 'POST',
              data: params
            }).then((res) => {
              console.info(res.data)
            }).catch(error => {
              console.log("付子欣你网络请求错误", error);
            });

            this.$router.replace({
              path: '/finish',
              params: {
                studentID: this.studentID
              },
            })
          }

        }else {
          console.log('@#$%^&*(#$%^&*(@#$%^&*(#$%^& fail')
          this.nextpageText = false
        }




      }).catch(error => {
        console.log("...", error);

      });

    },

    pre(){

      this.still = false

      var params = new FormData();// 创建form对象
      params.append('username', this.studentID);

      console.log(this.studentID+ 'dddddd')

      axios({
        url: '/dashboard/finish',
        method: 'POST',
        data: params

      }).then((res) => {

        console.info(res.data)

      }).catch(error => {
        console.log("付子欣你网络请求错误", error);
      });


      this.$router.replace({
        path: '/finish',
        params: {
          studentID: this.studentID
        },
      })

    }
  },


  mounted () {
    this.getCompetence()
    this.studentID = this.$route.params.studentID
    console.log(this.studentID)

    console.log('this is current codemirror object', this.codemirror)

  },

}
</script>


<style scoped>

  h2{
    margin-bottom: 20px;
    margin-top: 10px;
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
    /*width: 45%;*/
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 500px;
  }
  .resultShow {
  /*border: 1px solid green;*/
    /*width: 45%;*/
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 500px;
  }

  .txt{
    margin: 20px;
  }

  .camera_outer{
    position: absolute;
    top: 0;
    right: 0;
  }

</style>
