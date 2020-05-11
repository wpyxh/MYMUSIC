<template>
	<transition name="slide"   mode="in-out">
	<div class="collection">
		<nav-bar class="nav" ref="nav">
			<template v-slot:left>
				<i class="el-icon-arrow-left" @click="conllectionBack"></i>
			</template>
			<template v-slot:between>
				<div class="conllection-nav-tab">
					<div :class="{active}" class="coll" @click="collClick">
						<span>我的收藏</span>
					</div>
					<div class="rec-played" :class="{active:!active}" @click="recClick">
						<span>最近播放</span>
					</div>
				</div>
			</template>
		</nav-bar>
		
		<scroll class="collection-scroll">
			 <router-view></router-view>
		</scroll>
	</div>
	</transition>
</template>

<script>
	import navBar from "@/components/NavBar.vue"
	import scroll from "@/components/scroll.vue"
	export default{
		components:{
			navBar,
			scroll,
		},
		data(){
			return{
				active:true,
			}
		},
		methods:{
			conllectionBack(){
				this.$router.push('/home');
			},
			collClick(){
				this.active=true;
				this.$router.push('/myCollection')
			},
			recClick(){
				this.active=false;
				this.$router.push('/recentlyPlayed')
			},
		}
  }
	
</script>

<style scoped>
	.slide-enter-active {
		 transition:all .5s ease-in-out;
	}
	.slide-leave-active {
	  transition: all .5s;
	}
	.slide-enter {
		
		transform: translateX(-100%);
	  opacity: 0;
	}
	 .slide-leave-to {
	  transform: translateX(-100%);
	  opacity: 0;
	}
	
	.collection{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #f1f1f1;
	}
	.nav{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 44px;
}
	.collection .nav .el-icon-arrow-left{
		font-size: 24px;
		line-height: 44px;
	}
	.collection .nav .conllection-nav-tab{
		display: flex;
		width: 200px;
		height: 44px;
		text-align: center;
		display: inline-block;
	}
	.collection .nav .conllection-nav-tab .coll,.rec-played{
		flex: 1;
		display: inline-block;
		height: 32px;
		padding: 5px 8px;
		padding-top: 0;
		margin:0 8px;
		color: #f1f1f1;
		line-height: 44px;
	}
	.collection .nav .conllection-nav-tab .active{
		color: #fff;
		border-bottom: 2px solid #f1f1f1;
	}
	.collection-scroll{
		position: absolute;
		top: 44px;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>