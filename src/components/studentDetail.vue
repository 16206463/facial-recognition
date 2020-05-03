<template>

  <div >

    <h1>Student {{ studentID }} Detail</h1>

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="tab">
      <el-tab-pane label="Student Info" name="first" class="info" @click="check_student_info">
        <p>Student Name:  {{ student_name }}</p>
        <p>Password:  {{ password }}</p>
        <p>Model Loss:  {{ model_loss }}</p>
        <p>Model Accuracy:  {{ model_acc }}</p>
      </el-tab-pane>

      <el-tab-pane label="Photo Sample" name="second" style="display: inline" @click="check_origin">
        <!--v-for="origin in originlist"-->
        <el-image :src="origin" fit="fill"></el-image>
      </el-tab-pane>

      <el-tab-pane label="Exam Result" name="third" @click="check_exam">
          <el-table
            :data="tableDataEmotion"
            style="width: 100%">

            <el-table-column
              type="index"
              width="50">
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


      <el-tab-pane label="Warning List" name="fourth" @click="check_warninglist">
          <el-table
            :data="tableData"
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


            <el-table-column prop="image" label="image" min-width="20%" >
              <!-- 图片的显示 -->
              <template   slot-scope="scope">
                <!--          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"  min-width="70" height="70" />-->
                <el-image :src="scope.row.url"  min-width="70" height="70" fit="fill" />
              </template>
            </el-table-column>

            <el-table-column

              align="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="detail(scope.$index, scope.row)">detail</el-button>
              </template>
            </el-table-column>

          </el-table>

      </el-tab-pane>

    </el-tabs>

    <!--<div v-if="studentDetail">-->
      <!--<p>student_name:  {{ student_name }}</p>-->
      <!--<p>password:  {{ password }}</p>-->
      <!--<p>model-loss:  {{ model_loss }}</p>-->
      <!--<p>model_acc:  {{ model_acc }}</p>-->
    <!--</div>-->




    <!--<div>-->
      <!--<el-button @click="check_warninglist">check-warninglist</el-button>-->

      <!--<el-button @click="check_exam">check-exam result</el-button>-->

      <!--<el-button @click="check_origin">check-origin</el-button>-->

      <!--<el-button @click="check_student_info">check_student_info</el-button>-->
<!--&lt;!&ndash;      student_info&ndash;&gt;-->
    <!--</div>-->


    <!--<div class="block" v-for="origin in originlist"  style="display: inline">-->

      <!--<el-image :src="origin" fit="fill"></el-image>-->

    <!--</div>-->

    <!--<div>-->
      <!--<el-table-->
        <!--:data="tableDataEmotion"-->
        <!--style="width: 100%">-->

        <!--<el-table-column-->
          <!--type="index"-->
          <!--width="50">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="result"-->
          <!--label="result"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emotion"-->
          <!--label="emotion"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emurl"-->
          <!--label="url"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="emacc"-->
          <!--label="acc"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column prop="image" label="图片" min-width="20%" >-->
          <!--&lt;!&ndash; 图片的显示 &ndash;&gt;-->
          <!--<template   slot-scope="scope">-->
            <!--<el-image :src="scope.row.emurl"  min-width="70" height="70" fit="fill" />-->
          <!--</template>-->
        <!--</el-table-column>-->

      <!--</el-table>-->

    <!--</div>-->


    <!--<div>-->
      <!--<el-table-->
        <!--:data="tableData"-->
        <!--style="width: 100%">-->

        <!--<el-table-column-->
          <!--type="index"-->
          <!--width="50">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="url"-->
          <!--label="url"-->
          <!--width="180">-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
          <!--prop="acc"-->
          <!--label="acc"-->
          <!--width="180">-->
        <!--</el-table-column>-->


        <!--<el-table-column prop="image" label="image" min-width="20%" >-->
          <!--&lt;!&ndash; 图片的显示 &ndash;&gt;-->
          <!--<template   slot-scope="scope">-->
            <!--&lt;!&ndash;          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"  min-width="70" height="70" />&ndash;&gt;-->
            <!--<el-image :src="scope.row.url"  min-width="70" height="70" fit="fill" />-->
          <!--</template>-->
        <!--</el-table-column>-->

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

            model_acc: '',
            model_loss: '',
            student_name: '',
            password: '',


            tableDataEmotion: [],
            emotiondic: {},
            emotionlist: [],

            // studentDetail: true,

            activeName: 'first'
          }
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
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
                    acc: this.dic[each].acc
                  }
                  this.piclist.push(item)
                  this.tableData.push(item)
                }


              })
              .catch( (error) => {
                console.log(error);
              });
          },
        detail(index, row) {
          console.log( row.url );

          this.pic = row.url

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
