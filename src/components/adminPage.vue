<template>
  <div>
    <p>This is adminPage</p>



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

        <el-form-item>
          <el-button type="primary" @click="all">show all</el-button>
        </el-form-item>
      </el-form>
    </div>

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
        search: ''

      }
    },
    methods: {
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

          this.dic = res.data
          console.log(res.data)
          for(var each in res.data){
            // var item = {
            //   name: this.dic[each].name,
            //   warning_score: this.dic[each].warning_score,
            //   warning_times: this.dic[each].warning_times,
            //   student_number: this.dic[each].student_number
            // }
            // this.tableData.push(item)
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
    padding: 100px;
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
</style>
