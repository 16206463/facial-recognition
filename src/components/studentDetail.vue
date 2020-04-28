<template>

  <div>
    this page is about {{ studentID }}'s detail

    <el-button @click="check">check</el-button>


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


<!--      <el-table-column-->
<!--        prop="pic"-->
<!--        background="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"-->
<!--        background-size="cover"-->
<!--        label="pic"-->
<!--        width="180">-->
<!--      </el-table-column>-->

      <el-table-column prop="image" label="图片" min-width="20%" >
        <!-- 图片的显示 -->
        <template   slot-scope="scope">
<!--          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"  min-width="70" height="70" />-->
          <img :src="scope.row.url"  min-width="70" height="70" />
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
            // pic: require ('/Users/macbookair/facial_recognition_back_end/media/test_predict/16206455/warning/Sat Apr 25 2020 23:28:31 GMT+0800 (CST).jpg')
            pic: '',
            tableData: [],
            url: ''

          }
      },
      methods: {

          check(){
            var params = new URLSearchParams();
            params.append('username', this.studentID); //你要传给后台的参数值 key/value

            axios({
              url: '/dashboard/warning',
              method: 'POST',
              data: params,
            })
              .then( (response) => {
                // console.log(response);

                this.dic = response.data
                for(var each in response.data){
                  var item = {
                    url: this.dic[each]
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

</style>
