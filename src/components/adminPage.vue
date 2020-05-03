<template>
  <div>
    <h1>Admin Page</h1>



    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户姓名">
          <el-input v-model="formInline.username" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="formInline.type" placeholder="admin 1 / user 0">
            <el-option label="admin" value='1'></el-option>
            <el-option label="user" value='0'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>

<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="all">show all</el-button>-->
<!--        </el-form-item>-->

<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="analysis">analysis</el-button>-->
<!--        </el-form-item>-->
      </el-form>
    </div>

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="tab">
      <el-tab-pane label="Student List" name="first" @click="all">
        <div class="list">
          <el-table
              :data="tableData"
              style="width: 100%"
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

        <div class="note">
          <h3 style="text-align:left">Note:</h3>
          <el-table
            :data="noteData"
            border
            style="width: 50%">
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

      <el-tab-pane label="Exam Analysis " name="second" class="testAnalyse" @click="analysis">
          <el-table
            :data="tableDataTest"
            style="width: 100%"
            :row-class-name="tableRowClassName">

            <el-table-column
              type="index"
              width="50">
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
      </el-tab-pane>
    </el-tabs>

  <!--<div class="list">-->
    <!--<el-table-->
      <!--:data="tableData"-->
      <!--style="width: 100%"-->
      <!--:row-class-name="tableRowClassName">-->

      <!--<el-table-column-->
        <!--type="index"-->
        <!--width="50">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
        <!--prop="student_number"-->
        <!--label="studentID"-->
        <!--width="180">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="name"-->
        <!--width="180">-->
      <!--</el-table-column>-->


      <!--<el-table-column-->
        <!--prop="warning_times"-->
        <!--label="warning_times"-->
        <!--width="180">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
        <!--prop="warning_score"-->
        <!--label="warning_score"-->
        <!--width="180">-->
      <!--</el-table-column>-->


<!--&lt;!&ndash;      <el-table-column class="detail_button">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button type="primary"   @click="detail(scope.$index, scope.row)">详情</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-table-column>&ndash;&gt;-->

      <!--<el-table-column-->
        <!--align="right">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="detail(scope.$index, scope.row)">detail</el-button>-->


        <!--</template>-->
      <!--</el-table-column>-->


    <!--</el-table>-->
  <!--</div>-->

  <!--<div class="testAnalyse">-->
      <!--<el-table-->
        <!--:data="tableDataTest"-->
        <!--style="width: 100%"-->
        <!--:row-class-name="tableRowClassName">-->

        <!--<el-table-column-->
          <!--type="index"-->
          <!--width="50">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="correct"-->
          <!--label="correct"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emotion_happy"-->
          <!--label="emotion_happy"-->
          <!--width="180">-->
        <!--</el-table-column>-->


        <!--<el-table-column-->
          <!--prop="emotion_neutral"-->
          <!--label="emotion_neutral"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emotion_angry"-->
          <!--label="emotion_angry"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emotion_sad"-->
          <!--label="emotion_sad"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emotion_fear"-->
          <!--label="emotion_fear"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emotion_disgust"-->
          <!--label="emotion_disgust"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emotion_surprise"-->
          <!--label="emotion_surprise"-->
          <!--width="180">-->
        <!--</el-table-column>-->


      <!--</el-table>-->
    <!--</div>-->

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

  .note{
    margin-top: 50px;
  }
</style>
