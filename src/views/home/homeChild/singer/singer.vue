<template>
	<div class="singer">
		<scroll class="scroll" ref="scroll" @scroll="scrollY">
			
			<top-singers ref="topsiners"></top-singers>
			<singers @singerData="singerData"></singers>
		</scroll>
		
		<div class="order">
				<P v-for="(item,index) in singersS"
					:class="{active:scrollTo[index]<singersTo&&singersTo<=scrollTo[index+1]}"
					@click="scrollToClick(scrollTo[index])">{{item}}</P>
		</div>
	</div>
</template>

<script>
	import scroll from "@/components/scroll.vue"
	import topSingers from "./topSingers.vue"
	import singers from "./singers.vue"
	
	export default{
		components:{
			scroll,
			topSingers,
			singers,
		},
		data(){
			return{
				orderActive:null,
				singersSum:[],
				singersI:[],
				singersS:[],
				singersTo:0,
				saveY:0,
				height:0,
			}
		},
		mounted(){
			//console.dir(this.$refs.topsiners.$el.childNodes[])
		},
		methods:{
			singerData(data){
				this.singersSum=data.singersSum;
				this.singersI=data.singersI;
				this.singersS=data.singersS;
				//console.log(this.singersSum,this.singersI,this.singersS)
				this.scrollTo.unshift(735);
				//console.log(this.scrollTo)
			},
			singrtHeight(height){
				this.height=height;
			},
		scrollY(scrollY){
				this.singersTo=scrollY;
				
		},
		
		scrollToClick(scrollY){
			this.$refs.scroll.scroll.scrollTo(0,-scrollY-1,2000);
		}
		
	},
	computed:{
		scrollTo(){
			let scrollTo=this.singersI.map(item => item*71+20);
			let sum=735;
			return scrollTo.map((item,index,arr) => {
			 sum=sum+item;
				
				return sum;
			});
		}
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
	.order{
		height: 460px;
		width: 10px;
		position: fixed;
		top: 108px;
		right: 10px;
	}
	.order p{
		height: 12px;
		width: 11px;
		color: #757575;
		font-size: 8px;
		margin-top: 0;
	}
	.order .active{
		color: #D44439;
	}
</style>