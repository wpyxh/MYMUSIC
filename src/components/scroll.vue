<template>
		<div class="wrapper" ref='wrapper'>
			<div class="content">
				<slot></slot>
			</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		mounted(){
			this.scroll=new BScroll(this.$refs.wrapper,{
				click:true,
				tap:true,
				probeType:true,//通过变量控制是否使用，节约性能
				pullUpLoad:true,
				hasVerticalScroll:true,
				pullingUp:true,
				
			})
			this.scroll.on('scroll',position=>{//监听滚动事件
				//console.log(position.y)
				this.$emit('scroll',-position.y)
			})
			this.scroll.on('pullingDown',()=>{//监听下拉事件
				
			})
			
			this.scroll.on('pullingUp',()=>{//监听上拉
				this.$emit('pullingup')
			})
			
		},
	}
	
</script>

<style>
</style>