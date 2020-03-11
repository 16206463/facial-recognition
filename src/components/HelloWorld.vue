<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">zl</el-menu-item>
      <el-menu-item index="3" >冬DON---DDD</el-menu-item>
      <el-menu-item index="4"><a href="" target="_blank">tianze</a></el-menu-item>
    </el-menu>


    <div class="uploadpic">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    
    <div class="btn">
      <el-button type="primary" round>保存</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'facial recognition',
  data () {
    
    return {
      msg: '狗哥和他的小可爱们',
      activeIndex2: '3', //标题下变颜色
      file:'',
      dialogImageUrl: '',
      dialogVisible: false,
      imgUrl:'',
      userId: '',
      uid:'',
        
      // 上传图片时附带的额外参数userId
      resData:{
        userId: window.localStorage["userId"]
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
      
      // 点击保存按钮上传图片
    submit2:function(res){
    this.$refs.upload.submit();
  },
    
  // 图片上传成功后，后台返回图片的路径
  onSuccess:function(res){
    // console.log(res);
    if(res.status==200){
      this.imgUrl=res.data.imgUrl;
    }
  },
    }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn {
  margin: 50px;
}
.uploadpic{
  margin: 20px;
}
</style>
