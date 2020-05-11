<template>
	<div class="tab">
		<div class="tab-item" v-for="(item,index) in tab" @click="tabItemClick(index)">
			<span :class="{tabActive:index===tabItemIndex}">{{item}}</span>
		</div>
	</div>
	
</template>

<script>
	export default{
		props:{
			tab:{
				type:Array,
				default(){
					return []
			}
		}
		},
		data(){
			return{
				tabItemIndex:0,	
			}
		},
		methods:{
				tabItemClick(index){
					this.tabItemIndex=index;
					switch(index){
						case 0:this.$router.push('/recommend');
						break;
						case 1:this.$router.push('/top');
						break;
						case 2:this.$router.push('/singer');
						break;
					}
				}
		}
	}
</script>

<style scoped>
	.tab{
		width: 100%;
		height: 44px;
		background: #d44439;
		display: flex;
		color: #f1f1f1;
		text-align: center;
		position: fixed;
		top: 44px;
		left: 0;
		right: 0;
		z-index: 9999;
	}
	.tab .tab-item{
		flex: 1;
		font-size: 14px;
		line-height: 44px;
		cursor: pointer;
	}
	.tab .tab-item .tabActive{
		padding-bottom: 3px;
		border-bottom: 2px solid #f1f1f1;
		font-weight: 700;
	}
</style>