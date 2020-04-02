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
            <el-button type="primary" @click="submitusrForm('ruleForm')">添加新用户并登陆</el-button>
            <el-button type="primary" @click="submitadForm('ruleForm')">添加新管理员并登陆</el-button>
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
      submitusrForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            var params = new URLSearchParams();
            params.append('admin', 0); //你要传给后台的参数值 key/value
            params.append('username', this.ruleForm.account);
            params.append('password', this.ruleForm.password);
            axios({
              url: '/dashboard/add_user',
              data: params,
              method: 'POST'
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

          } else {
            this.$message.error('登录失败');
            return false;
          }
        });
      },
      submitadForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = new URLSearchParams();
            params.append('admin', 1); //你要传给后台的参数值 key/value
            params.append('username', this.ruleForm.account);
            params.append('password', this.ruleForm.password);

            axios({
              url: '/dashboard/add_user',
              data: params,
              method: 'POST'
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
</style>
