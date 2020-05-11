<template>
	<div class="home">
		<nav-bar class="nav">
			<template v-slot:left>
				<img class="wh" src="@/assets/img/caidan.svg" @click="caidanClick">
			</template>
			<template v-slot:between>
				<span class="title">MYMUSIC</span>
			</template>
			<template v-slot:right>
			  <i class="el-icon-search" @click="search"></i>
			</template>
		</nav-bar>
	
		<tab :tab='tab'></tab>
		
		 <keep-alive>
      <router-view></router-view>
    </keep-alive>
	</div>
</template>

<script>
	import navBar from "@/components/NavBar.vue"
	import tab from "./homeChild/tab.vue"
	import recommend from "./homeChild/recommend/recommend.vue"
	export default{
		name:'home',
		components:{
			navBar,
			tab,
			recommend,
		},
		data(){
			return{
				tab:['推荐','排行','歌手'],
			}
		},
		methods:{
			search(){
				this.$router.push("\search")
			},
			caidanClick(){
				this.$router.push("\collection")
			},
		}
	}
	
</script>

<style scoped>
	.home{
	position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
	}
	.nav .title{
		font-weight: 700;
		font-size: 19px;
		letter-spacing: 3px;
	}
	
	.nav .el-icon-search{
		font-size: 19px;
	}
</style>