<template>

  <div >

    <h1>Student {{ studentID }} Detail</h1>


    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="tab" v-if="upload">

      <el-tab-pane label="Q&A" name="first" style="text-align: left; margin: 5px">
        <h3 style="margin-bottom: 5px">Q: What is Model loss?</h3>
        <p style="margin-bottom: 30px">A: It is the loss function of the model, a method used to show the difference between the predicted data and the real data.</p>

        <h3 style="margin-bottom: 5px">Q: What is Model Accuracy?</h3>
        <p style="margin-bottom: 30px">A: It is the accuracy of the model, the extent to which the predicted data coincide with the real data.</p>

        <h3 style="margin-bottom: 5px">Q: What is Photo Sample?</h3>
        <p style="margin-bottom: 30px">A: Randomly extract 10 photos from 100 photos used in training model. The administrator can compare it with the warning photos to determine whether the students cheated or not.</p>

        <h3 style="margin-bottom: 5px">Q: What is Exam Result?</h3>
        <p style="margin-bottom: 30px">A: It shows the student’s result for each question, the student's facial expression in doing each question, and the predictive possibility of this expression.</p>

        <h3 style="margin-bottom: 5px">Q: How to check warning photos?</h3>
        <p style="margin-bottom: 30px">A: You can see all the warning photos in the Warning List. Administrator can compare them with the photos in the Photo Sample to determine whether the student was cheating. If the administrator thinks the student was not cheating, please click on 'pass' button to remove this photo form warning list to reduce the warning_score of this student.</p>
      </el-tab-pane>


      <el-tab-pane label="Student Info" name="second" class="info" >
        <p>Student Name:  {{ student_name }}</p>
        <p>Password:  {{ password }}</p>
        <p>Model Loss:  {{ model_loss }}</p>
        <p>Model Accuracy:  {{ model_acc }}</p>

        <el-image fit="fill" :src="plt_url"> training-model </el-image>
      </el-tab-pane>


      <el-tab-pane label="Photo Sample" name="third" style="display: inline" >
        <!--v-for="origin in originlist"-->
        <template v-for="origin in originlist">
          <el-image :src="origin" fit="fill"></el-image>
        </template>

      </el-tab-pane>

      <el-tab-pane label="Exam Result" name="fourth" >
          <el-table
            :data="tableDataEmotion"
            empty-text="No data"
            style="width: 100%">

            <el-table-column
              type="index"
              width="180"
              label="Question">
            </el-table-column>

            <el-table-column
              prop="result"
              label="result"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emotion"
              label="emotion"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emurl"
              label="url"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emacc"
              label="acc"
              width="180">
            </el-table-column>

            <el-table-column prop="image" label="图片" min-width="20%" >
              <!-- 图片的显示 -->
              <template   slot-scope="scope">
                <el-image :src="scope.row.emurl"  min-width="70" height="70" fit="fill" />
              </template>
            </el-table-column>

          </el-table>

      </el-tab-pane>


      <el-tab-pane label="Warning List" name="fifth" >
          <el-table
            :data="tableData"
            empty-text="No data"
            style="width: 100%">

            <el-table-column
              type="index"
              width="50">
            </el-table-column>

            <el-table-column
              prop="url"
              label="url"
              width="180">
            </el-table-column>

            <el-table-column
              prop="acc"
              label="acc"
              width="180">
            </el-table-column>

            <el-table-column
              prop="picname"
              label="picname"
              width="180">
            </el-table-column>

            <el-table-column
              prop="state"
              label="state"
              width="180">
            </el-table-column>


            <el-table-column prop="image" label="image" min-width="20%" >
              <!-- 图片的显示 -->
              <template   slot-scope="scope">
                <el-image :src="scope.row.url"  min-width="70" height="70" fit="fill"  />
              </template>
            </el-table-column>

            <el-table-column
              align="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="Pass(scope.$index, scope.row)">pass</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>


    </el-tabs>

  </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "studentDetail",

      data(){
          return{

            studentID: '',
            dic: {},
            piclist: [],

            pic: '',
            tableData: [],
            url: '',

            originlist: [],
            origindic: {},
            origin: '',

            upload: true,

            model_acc: '',
            model_loss: '',
            student_name: '',
            password: '',


            tableDataEmotion: [],
            emotiondic: {},
            emotionlist: [],

            // studentDetail: true,

            activeName: 'first',
            plt_url: ''
          }
      },
      methods: {
        handleClick(tab, event) {


          if(tab.index == 1){
            // this.$router.$options.check_student_info();
            this.check_student_info()
          }else if( tab.index == 2){
            this.check_origin();
          }else if(tab.index == 3){
            this.check_exam();
          }else if(tab.index == 4){
            this.check_warninglist();
          }

        },

        check_student_info(){
          var params = new URLSearchParams();
          params.append('username', this.studentID); //你要传给后台的参数值 key/value

          axios({
            url: '/dashboard/student_info',
            method: 'POST',
            data: params,
          })
            .then( (response) => {
              console.log(response);

              this.studentDetail = true

              this.student_name = response.data.name
              this.password = response.data.password
              this.model_acc = response.data.model_acc
              this.model_loss = response.data.model_loss
              this.plt_url  = response.data.plt_url

            })
            .catch( (error) => {
              console.log(error);
            });

        },


        check_origin(){
          var params = new URLSearchParams();
          params.append('username', this.studentID); //你要传给后台的参数值 key/value

          this.originlist.length = 0

          axios({
            url: '/dashboard/origin',
            method: 'POST',
            data: params,
          })
            .then( (response) => {
              console.log(response);

              this.origindic = response.data

              // console.log(this.origindic)
              for(var each in this.origindic){
                this.originlist.push(this.origindic[each])
              }

              console.log(this.originlist)


            })
            .catch( (error) => {
              console.log(error);
            });

        },

        check_exam(){
          var params = new URLSearchParams();
          params.append('username', this.studentID); //你要传给后台的参数值 key/value

          console.log(this.studentID)
          this.tableDataEmotion.length = 0

          axios({
            url: '/dashboard/exam_result',
            method: 'POST',
            data: params,
          })
            .then( (response) => {
              console.log(response);

                this.emotiondic = response.data

                console.log(this.emotiondic)

                for(var each in this.emotiondic){
                  var item = {
                    emurl: this.emotiondic[each].url,
                    emotion: this.emotiondic[each].emotion,
                    result: this.emotiondic[each].result,
                    emacc: this.emotiondic[each].emotion_acc
                  }

                  this.emotionlist.push(item)
                  this.tableDataEmotion.push(item)
                  //
                  console.log(this.emotiondic[each].acc)

              }

            })
            .catch( (error) => {
              console.log(error);
            });



        },

        check_warninglist(){
            var params = new URLSearchParams();
            params.append('username', this.studentID); //你要传给后台的参数值 key/value

          this.tableData.length = 0

            axios({
              url: '/dashboard/warning',
              method: 'POST',
              data: params,
            })
              .then( (response) => {
                console.log(response);

                this.dic = response.data

                console.log(this.dic)
                for(var each in response.data){
                  var item = {
                    url: this.dic[each].url,
                    acc: this.dic[each].acc,
                    picname: this.dic[each].pic_name,
                    state: this.dic[each].state
                  }
                  this.piclist.push(item)
                  this.tableData.push(item)
                }


              })
              .catch( (error) => {
                console.log(error);
              });
          },
        Pass(index, row) {
          console.log( index );

          var params = new URLSearchParams();
          params.append('username', this.studentID); //你要传给后台的参数值 key/value
          params.append('index', index+1); //你要传给后台的参数值 key/value
          params.append('pic_name', row.picname); //你要传给后台的参数值 key/value



          axios({
            url: '/dashboard/remove',
            method: 'POST',
            data: params,
          })
            .then( (response) => {
              console.log(response);

              this.tableData.splice(index,1,);

            })
            .catch( (error) => {
              console.log(error);
            });

          // this.pic = require (" `row.url` ")

        },
      },
      mounted () {
        this.studentID = this.$route.params.studentID
      }
    }
</script>

<style scoped>
.block {

  /*display:inline-block;*/
}

  h1{
    margin: 20px;
  }

  .tab{
    height: 100%;
    /*width: 100%;*/
    margin: 10px;
  }

  html, body{ height:100%; }
</style>
