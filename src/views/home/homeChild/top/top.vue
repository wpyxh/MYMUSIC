<template>
	<div class="top">
		<scroll class="scroll" ref="scroll">
			<top-list></top-list>
		</scroll>
	</div>
</template>

<script>
	import scroll from "@/components/scroll.vue"
	import topList from "./topList.vue"
	export default{
		data(){
			return{
				saveY:0,
			}
		},
		components:{
			scroll,
			topList 
		},
		activated(){
		this.$refs.scroll.scroll.refresh();
		this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);//重新回到页面时，页面回到离开前的位置
		
	},
	deactivated(){
		this.saveY=this.$refs.scroll.scroll.y;//保留页面离开前的位置
		
	},
	}
	
</script>

<style scoped>
	.scroll{
		position: absolute;
		top: 88px;
		bottom:0px;
		left: 0;
		right: 0;
		overflow: hidden;
		background:#f1f1f1;
	}
</style>