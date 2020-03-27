<template>
	<div>
		<h1>user Page</h1>
		<h2>{{ $route.params.userId }}</h2>
    <h3>{{ message }}</h3>
<!--    <button @click='ky' >c跨域csdn</button>-->
    <button @click='deleteuser' >删除用户</button>
	</div>

</template>

<script type="text/javascript">
  import axios from 'axios';

	export default{
		name: 'userPage',
    data(){
      return{
        message: '',
      }
    },
		methods: {

      // ky() {
      //   console.log('click')
      //
      //   axios({
      //     url: '/api/articles?type=more&category=home&shown_offset=1524276761019196&first_view=false',
      //   }).then(res => {
      //     console.log(res);
      //     this.message = res
      //   })
      //
      // },

      deleteuser() {
        console.log('click')

        axios({
          url: 'http://localhost:8000/dashboard/delUser',
          method: 'POST'
        }).then(res => {
          console.log(res);
          this.message = res
        })

      }

    }
	}
</script>

<style type="text/css">

</style>
