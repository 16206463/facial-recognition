<template>
  <div class="login-info">
    <el-row>
      <el-col >
        <h3 style="text-align: center;"> login page </h3>
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号：" prop="account">
            <el-input  v-model="ruleForm.account" autocomplete="off" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'login',
    data() {
      var validateAccount = (rule,value,callback) => {
        if(value ===''){
          return callback(new Error("账号不能为空"));
        }else{
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [{
            validator: validateAccount,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePassword,
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.account !="admin" || this.ruleForm.password!="123456"){
              this.$message.error('账号密码不正确');

              return false;

            }else{
              let data = {"账号":"admin","密码":"123456"};
              // axios.post("http://127.0.0.1:8000/",data)
              //   .then()
              axios.post('https://httpbin.org/post', {
                firstName: 'Fred',
                lastName: 'Flintstone'
              })
                .then( (response) => {
                  console.log(response);
                })
                .catch( (error) => {
                  console.log(error);
                });

              this.$message({
                message: '登陆成功',
                type: 'success'
              });

              this.$router.push('/facialRecognition')



            }
          } else {
            this.$message.error('登录失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login-info >>> .el-col{
    /*background-color: #e5e8ec;*/
    padding: 2% 5% 0% 2%;
  }
  /* .login-info >>> .el-form-item{
    width:63%;
  } */

</style>
