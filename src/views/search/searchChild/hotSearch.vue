<template>
	<div class="hot-search">
			<p>热门搜索</p>
			<div class="hot-list">
				<span class="hot-item" 
					v-for="item in hotSearch" 
					@click="hotItemClick(item.first)">{{item.first}}</span>
			</div>
		</div>
</template>

<script>
	import {getHotSearch} from "@/network/search.js"
	export default{
		data() {
      return {
      	hotSearch:null,
      }
    },
    created(){
			this.getHotSearch();
			this.$store.commit("clearScreachSongsInportantInfoArr")
		},
		methods:{
			getHotSearch(){
				getHotSearch().then(res => {
					this.hotSearch=res.result.hots;
					//console.log(this.hotSearch)
				})
			},
			hotItemClick(name){
				this.$emit("hotItemName",name)
			}
		},
	}
</script>

<style scoped>
	.hot-search{
	position: relative;
	top: 0;
	left: 20px;
	right: 20px;
	width: 87.5%;
	margin-bottom: 20px;
}
.hot-search p{
	margin: 0;
	padding: 15px 5px 0;
	height: 30px;
	line-height: 30px;
	font-size: 12px;
	color: #757575;
}
.hot-search .hot-list .hot-item{
	display: inline-block;
	padding: 3px 5px;
	margin: 4px;
	border: .8px solid #c7c7c7;
	border-radius: 5px;
	line-height: 20px;
	color: #2e3030;
	font-size: 14px;
}
</style>