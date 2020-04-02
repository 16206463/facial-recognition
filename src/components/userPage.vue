<template>
	<div>
		<h1>user Page</h1>
		<h2>{{ $route.params.userId }}</h2>
    <h3>{{ message }}</h3>
<!--    <button @click='ky' >c跨域csdn</button>-->
    <button @click='deleteuser' >delete user</button>
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

      deleteuser() {
        console.log('click')

        axios({
          url: '/dashboard/delUser',
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
