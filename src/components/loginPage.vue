<template>


  <div class="login_page fillcontain">


    <el-steps :active="1" width="80%">
      <el-step title="Step 1" icon="el-icon-user"></el-step>
      <el-step title="Step 2" icon="el-icon-upload"></el-step>
      <el-step title="Step 3" icon="el-icon-edit"></el-step>
    </el-steps>


    <transition name="form-fade" mode="in-out">

      <section class="form_contianer" >
        <div class="manage_tip">
          <p>Welcome</p>
        </div>
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm">
          <el-form-item prop="account">
            <el-input  v-model="ruleForm.account" placeholder="StudentID"autocomplete="off" clearable>
            </el-input>

          </el-form-item>

          <el-form-item prop="password">

            <el-input type="password" v-model="ruleForm.password" placeholder="Password" autocomplete="off" show-password clearable></el-input>

          </el-form-item>

          <el-form-item>

            <el-button round type="primary" @click="submitusrForm('ruleForm')" class="submit_btn">Log in</el-button>

          </el-form-item>


          <el-form-item>

            <el-button round type="primary" @click="submitadForm('ruleForm')" class="submit_btn">Admin Log in</el-button>

          </el-form-item>

          <el-form-item>

            <el-button round type="primary" @click="To" class="submit_btn">register</el-button>

          </el-form-item>

        </el-form>

        <p class="tip">Automatic registration of new users.</p>
        <p class="tip">Registered users log in with user name and password.</p>

      </section>
    </transition>
  </div>
</template>



<script>

  import axios from "axios";

  export default {

    name: 'login',

    data() {

      var validateAccount = (rule,value,callback) => {

        if(value ===''){

          return callback(new Error("Please enter your account"));

        }else{

          callback();

        }

      };

      var validatePassword = (rule, value, callback) => {

        if (value === '') {

          callback(new Error('Please enter your password'));

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

          username: [

            { required: true, message: 'Please enter user name', trigger: 'blur' },

          ],

          password: [

            { required: true, message: 'Please enter password', trigger: 'blur' }

          ],

        },

      };
    },
    methods: {
      submitusrForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            var params = new URLSearchParams();

            params.append('admin', '0');
            params.append('username', this.ruleForm.account);
            params.append('password', this.ruleForm.password);

            axios({
              url: '/dashboard/login',
              data: params,
              method: 'POST'
            })
              .then( (response) => {
                console.log(response);

                if(response.data == "Login successfully without model"){
                  this.$message({
                    message: 'login successlly',
                    type: 'success'
                  });

                  //用户名当参数传递给用户页
                  this.$router.push({
                    path: '/userPage/'+this.ruleForm.account,
                    params: {
                      studentID: this.ruleForm.account
                    }
                  })
                }else if(response.data == "Login successfully with model"){
                  this.$message({
                    message: 'login successlly',
                    type: 'success'
                  });

                  //用户名当参数传递给用户页
                  // this.$router.push({
                  //   path: '/question/'+this.ruleForm.account,
                  //   params: {
                  //     studentID: this.ruleForm.account
                  //   }
                  // })

                  this.$router.push(
                    {
                      name: 'question',
                      params: {
                        studentID: this.ruleForm.account,
                        data: 1
                      }
                    })

                }else{
                  this.$message.error('Wrong username or password');
                }
              })
              .catch( (error) => {
                console.log(error);
              });



          } else {
            this.$message.error('login failed');
            return false;
          }
        });
      },
      submitadForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = new URLSearchParams();

            params.append('admin', '1');
            params.append('username', this.ruleForm.account);
            params.append('password', this.ruleForm.password);

            axios({
              url: '/dashboard/login',
              data: params,
              method: 'POST'
            })
              .then( (response) => {
                console.log(response);

                if(response.data == 'Login successfully'){
                  this.$message({
                    message: 'login successfully',
                    type: 'success'
                  });

                  this.$router.push('/admin')

                }else {
                  this.$message.error('login failed');
                  return false;
                }

              })
              .catch( (error) => {
                console.log(error);
              });

          //   this.$message({
          //     message: 'login successfully',
          //     type: 'success'
          //   });
          //
          //   this.$router.push('/admin')
          //
          // } else {
          //   this.$message.error('login failed');
          //   return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      To(){
        this.$router.push({
          path: '/register',

        })
      }


    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#Ffffff')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>


<style lang="less" scoped>

  @import '../style/mixin';
  .login_page{

  }

  .manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    font-size: 35px;
    color: #1F6FB5;

  }

  .container {
    height:100%;width:100%;
    border: 1px solid green;
    position:fixed;
  }

  .form_contianer{
    .wh(320px, 280px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 15px;
    text-align: center;
    background-color: #1F6FB5;
    .submit_btn{
      width: 100%;
      font-size: 16px;
      background-color: #9DD3FA;
      /*color: #FCD692;*/
    }
  }

  .tip{
    font-size: 12px;
    color: #FAFFEB;
  }


  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;

  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
