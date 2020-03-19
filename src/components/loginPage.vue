<template>
	<div>
		<h1>{{ msg }}</h1>
		<div>
			<el-input class='account' placeholder="请输入账号" v-model="input"></el-input>
			<el-input class='password' placeholder="请输入密码" v-model="input" show-password></el-input>

			<div>
      	<el-button @click="gotolink" class='To' type="primary" >el按钮跳转</el-button>
    	</div>

		</div>
	</div>

	

</template>


<script type="text/javascript">
export default{
	name: 'loginPage',
	data(){
		return{
			msg: 'loginPage',
			input: '',
		}
	},
	methods: {
		gotolink(){
      this.$router.push('/facialRecognition')
    }
	}

}

</script>


<style type="text/css">
.account{
	padding: 20px;
}
.password{
	padding: 20px;
}
.To {
	margin-top:  120px;
}

</style>