<template>
	<div class="warpper" v-show="isShow">
		<div class="toast">
		<span>{{message}}</span>
		<div class="btn">
			<span class="cancle" @click="cancleClick">取消</span>
			<span class="empty" @click="emptyClick">清空</span>
		</div>
	</div>
	</div>
		
</template>

<script>
	export default{
		data(){
			return{
				message:'',
				isShow:false,
			}
		},
		methods:{
			show(message='yxh'){
				this.isShow=true;
				this.message=message;
			},
			cancleClick(){
				this.isShow=false;
				this.message="";
			},
			emptyClick(){
				this.$bus.$emit("emptyClick")
				//console.log(this.$bus)
				this.isShow=false;
				this.message="";
			}
		}
	}
</script>

<style scoped>
	.warpper{
		position: fixed;
		background: rgba(0,0,0,0.2);
		z-index: 9999;
		width: 100%;
		height: 100%;
	}
	.toast{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 250px;
		height: 100px;
		background-color: #f1f1f1;
		text-align: center;
		border-radius: 10px;
		z-index: 1000;
	}
	.toast span{
		color: #000;
		line-height: 50px;
	}
	.btn{
		position: absolute;
		bottom: 10px;
		width: 100%;
		height: 30px;
	}
	.btn span{
		position: absolute;
		padding: 0 40px;
		line-height: 30px;
		color: #D81E06;
	}
	.btn .cancle{
		left: 0;
	}
	.btn .empty{
		right: 0;
	}
</style>