<template>


  <div class="login_page fillcontain">


    <transition name="form-fade" mode="in-out">

      <section class="form_contianer" >
        <div class="manage_tip">
          <p>Welcome</p>
        </div>
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm">


          <el-form-item prop="studentID">
            <el-input  v-model="ruleForm.studentID" placeholder="studentID" autocomplete="off" clearable></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="Password" autocomplete="off" show-password clearable></el-input>
          </el-form-item>

          <el-form-item prop="account">
            <el-input  v-model="ruleForm.account" placeholder="name" clearable>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button round type="primary" @click="registerusrForm('ruleForm')" class="submit_btn">Register and Log in</el-button>
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

    name: 'register',

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

          studentID: ''

        },

        rules: {

          username: [

            { required: true, message: 'Please enter user name', trigger: 'blur' },

          ],

          password: [

            { required: true, message: 'Please enter password', trigger: 'blur' }

          ],

          studentID: [

            { required: true, message: 'Please enter studentID', trigger: 'blur' }

          ],
        },

      };
    },
    methods: {
      registerusrForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            var params = new URLSearchParams();
            params.append('student_number', this.ruleForm.studentID); //你要传给后台的参数值 key/value
            params.append('username', this.ruleForm.account);
            params.append('password', this.ruleForm.password);

            axios({
              url: '/dashboard/add_user',
              data: params,
              method: 'POST'
            })
              .then( (response) => {
                console.log(response);

                  this.$message({
                    message: 'register successfully',
                    type: 'success'
                  });

                  //用户名当参数传递给用户页
                  this.$router.push({
                    path: '/userPage/'+this.ruleForm.studentID,
                    params: {
                      studentID: this.ruleForm.studentID
                    }
                  })

              })
              .catch( (error) => {
                console.log(error);
              });
          } else {
            this.$message.error('register failed');
            return false;
          }
        });
      },

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
