<template>
  <div>
    <h1>Admin Page</h1>



    <div>
<!--      <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--        <el-form-item label="用户姓名">-->
<!--          <el-input v-model="formInline.username" placeholder="User Name"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户类型">-->
<!--          <el-select v-model="formInline.type" placeholder="admin 1 / user 0">-->
<!--            <el-option label="admin" value='1'></el-option>-->
<!--            <el-option label="user" value='0'></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">查询</el-button>-->
<!--        </el-form-item>-->

<!--      </el-form>-->
    </div>

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="tab">
      <el-tab-pane label="Warning Score Standard" name="first">
        <div class="note">
          <el-table
            :data="noteData"
            border
            empty-text="No data"
            style="width: 100%">
            <el-table-column
              prop="score"
              label="Warning Score"
              width="200">
            </el-table-column>
            <el-table-column
              prop="risk"
              label="Plagiarism Risk"
              width="400">
            </el-table-column>
            <el-table-column
              prop="check"
              label="Check Needed">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Student List" name="second" @click="all">
        <div class="list">
          <el-table
              :data="tableData"
              style="width: 100%"
              empty-text="No data"
              :row-class-name="tableRowClassName">

              <el-table-column
                type="index"
                width="50">
              </el-table-column>

              <el-table-column
                prop="student_number"
                label="studentID"
                width="180">
              </el-table-column>

              <el-table-column
                prop="name"
                label="name"
                width="180">
              </el-table-column>


              <el-table-column
                prop="warning_times"
                label="warning_times"
                width="180">
              </el-table-column>

              <el-table-column
                prop="warning_score"
                label="warning_score"
                width="180">
              </el-table-column>


              <!--      <el-table-column class="detail_button">-->
              <!--        <el-button type="primary"   @click="detail(scope.$index, scope.row)">详情</el-button>-->
              <!--      </el-table-column>-->

              <el-table-column
                align="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="detail(scope.$index, scope.row)">detail</el-button>
                </template>
              </el-table-column>

            </el-table>
        </div>



      </el-tab-pane>

      <el-tab-pane label="Exam Analysis " name="third" class="testAnalyse" @click="analysis">
          <el-table
            :data="tableDataTest"
            style="width: 100%"
            :row-class-name="tableRowClassName">

            <el-table-column
              type="index"
              width="180"
              label="Question">
            </el-table-column>

            <el-table-column
              prop="correct"
              label="correct"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emotion_happy"
              label="emotion_happy"
              width="180">
            </el-table-column>


            <el-table-column
              prop="emotion_neutral"
              label="emotion_neutral"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emotion_angry"
              label="emotion_angry"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emotion_sad"
              label="emotion_sad"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emotion_fear"
              label="emotion_fear"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emotion_disgust"
              label="emotion_disgust"
              width="180">
            </el-table-column>

            <el-table-column
              prop="emotion_surprise"
              label="emotion_surprise"
              width="180">
            </el-table-column>

          </el-table>
        <h3 style="text-align: left; margin-top: 20px; margin-bottom: 10px">Summary :</h3>
          <p style="text-align: left"> total user {{ this.totaluser }} , attendance {{ this.attendance}} , average_score {{ this.average_score }}</p>


      </el-tab-pane>

      <el-tab-pane label="Q&A " name="fourth" style="text-align: left; margin: 5px">
        <h3 style="margin-bottom: 5px">Q: How to view students' exam information?</h3>
        <p style="margin-bottom: 30px">A: You can see all registered students in the Student List, click 'detail' button to see the student's detailed exam information.</p>

        <h3 style="margin-bottom: 5px">Q: What is warning_time?</h3>
        <p style="margin-bottom: 30px">A: The number of times students are warned in exams.</p>

        <h3 style="margin-bottom: 5px">Q: What is warning_score?</h3>
        <p style="margin-bottom: 30px">A: Students' risk of plagiarism in the exam. Detailed description is in the Warning Score Standard.</p>

        <h3 style="margin-bottom: 5px">Q: What is Exam Analysis?</h3>
        <p style="margin-bottom: 30px">A: You can see the number of students doing correct on each question and students' facial expression in doing the questions. emotion_happy, emotion_neutral, emotion_angry, emotion_sad, emotion_fear, emotion_disgust, emotion_surprise represent the number of expressions displayed when doing the questions. The administrator can judge and adjust the difficulty of the questions according to the student's expression.</p>
      </el-tab-pane>


    </el-tabs>

  </div>

</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        formInline: {
          username: '',
          type: '',
          score: '',
        },
        tableData: [],
        dic: {},

        totaluser: '',
        attendance: '',
        average_score: '',

        name:'',
        student_number: 0,
        warning_score: '',
        warning_times: '',
        //
        search: '',


        testdic: {},
        testlist: [],
        tableDataTest: [],

        activeName: 'first',

        noteData: [{
          score: '0 - 0.2',
          risk: 'No risk of plagiarism',
          check: 'NO'
        }, {
          score: '0.2 - 0.5',
          risk: 'Low risk of plagiarism',
          check: 'NO'
        }, {
          score: '0.5 - 0.7',
          risk: 'High risk of plagiarism',
          check: 'YES'
        }, {
          score: '0.7 - 1',
          risk: 'Extremely high risk of plagiarism',
          check: 'YES'
        }]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);


        if(tab.index == 0){
          // this.$router.$options.check_student_info();

        }else if( tab.index == 1){
          this.all();
        }else if(tab.index == 2){
          this.analysis();
        }


      },

      onSubmit() {
        console.log('submit!');

        var params = new URLSearchParams();
        params.append('type', this.formInline.type);
        params.append('username', this.formInline.username);

        axios({
          url: '/dashboard/find_user',
          data: params,
          method: 'POST'
        })
          .then( (response) => {
            console.log(response);
          })
          .catch( (error) => {
            console.log(error);
          });
      },
      analysis(){

        axios({
          method: 'post',
          url: '/dashboard/analysis'
        }).then( res => {

          console.log(res.data)

          this.tableDataTest.length = 0

          for(var each in res.data){

            this.tableDataTest.push(res.data[each])
            console.log(each)
          }

        })
          .catch( (error) => {
            console.log(error);
          });

        axios({
          method: 'post',
          url: '/dashboard/overall'
        }).then( res => {

          console.log(res.data)

          this.totaluser = res.data.total_user
          this.attendance = res.data.attendance
          this.average_score = res.data.average_score

        })
          .catch( (error) => {
            console.log(error);
          });

      },
      ave(){

        axios({
          method: 'post',
          url: '/dashboard/overall'
        }).then( res => {

          console.log(res.data)


        })
          .catch( (error) => {
            console.log(error);
          });

      },

      tableRowClassName({row,rowIndex}) {
        if (row.warning_times >= 5 ) {
          console.log(row.warning_times)
          console.log('111111')
          return 'warning-row';
        } else {
          console.log('101111')
          console.log(row.warning_times)
          return 'success-row';
        }
      },

      all() {
        console.log('submit!');
        axios({
          method: 'post',
          url: '/dashboard/student_list'
        }).then( res => {

          this.tableData.length = 0

          this.dic = res.data
          console.log(res.data)
          for(var each in res.data){
            this.tableData.push(res.data[each])
            console.log(each)
          }

        })
          .catch( (error) => {
            console.log(error);
          });
      },

      detail(index, row) {
        console.log('row: ' + row)
        console.log('index: ' + index)

        var studentID = this.tableData[index].student_number
        console.log(this.tableData[index].student_number+ 'stuid')



        var params = new URLSearchParams();
        params.append('username', studentID); //你要传给后台的参数值 key/value

        axios({
          url: '/dashboard/warning',
          method: 'POST',
          data: params,
        })
          .then( (response) => {
            console.log(response);
          })
          .catch( (error) => {
            console.log(error);
          });

        this.$router.push({
          path: '/studentDetail/'+studentID,
          params: {
            studentID: studentID
          }
        })

      },


      handleEdit(index, row) {
        console.log( index );
      },
      handleDelete(index, row) {
        console.log(index, row);
      }

    }
  }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .list{

    display: flex;
    /*padding: 100px;*/
  }

  .detail_button{
    display: flex;
    justify-content: flex-end;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  h1{
    margin: 10px;
  }

  .tab{
    margin: 10px;
  }

</style>
