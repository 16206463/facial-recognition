<template>
	<div>
		<h1>user Page</h1>
		<h2>{{ $route.params.userId }}</h2>
    <h3>{{ message }}</h3>
    <button @click='getmessage'>获取</button>
	</div>

</template>

<script type="text/javascript">
  import axios from 'axios';

	export default{
		name: 'userPage',
    data(){
      return{
        message: '获取',
      }
    },
		methods: {

		  getmessage() {
        console.log('click')
		    axios({
          url: 'http://123.207.32.32:8000/home/multidata'
        }).then( res => {
          console.log(res);
          this.message = res
        })
      }

    }
	}
</script>

<style type="text/css">

</style>
