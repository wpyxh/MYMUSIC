<template>
	<transition name="slide"   mode="in-out">
	<div class="search">
		<nav-bar class="nav" ref="nav">
			<template v-slot:left>
				<i class="el-icon-arrow-left" @click="searchBack"></i>
			</template>
			<template v-slot:between>
				<input class="searchInput"
				  v-model="input" type="text"
					placeholder="搜索歌曲、歌手" 
					 >
			</template>
			<template v-slot:right>
			  <i class="el-icon-close" @click="delContent" v-show="closeShow"></i>
			</template>
		</nav-bar>
		
		<scroll class="search-scroll" @pullingup="loadSongs()" ref="searchscroll">
			<router-view @hotItemName="hotItemName"></router-view>
			
			<div class="search-history" v-show="!input">
				 <div class="search-history-title" v-show="this.$store.state.searchHistoryArr.length!=0">
				 	<span>搜索历史</span>
				 	<i class="el-icon-delete" @click="delAllHistory"></i>
				 </div>
				
				 <div class="search-history-item" v-for="item in this.$store.state.searchHistoryArr">
				 	<span @click="searchHistoryItemClick(item)">{{item}}</span>
				 	<i class="el-icon-close" @click="delHistorySong(item)"></i>
				 </div>
			</div>
		</scroll>
		
	</div>
	</transition>
</template>

<script>
		import navBar from "@/components/NavBar.vue"
		import scroll from "@/components/scroll.vue"
		import {getSearch} from "@/network/search.js"
	export default{
		components:{
			navBar,
			scroll,
		},
		data() {
      return {
        input: null,
        closeShow:false,
        offset:0,
      }
   },
   created(){
   	this.$watch('input', this.debounce(() => {
       this.inputfun()
    }, 500))
   	this.input=this.$store.state.searchInput;
   },
		methods:{
			getSearch(keywords,offset){
				if(offset===0){
					getSearch(keywords,offset).then(res => {
						let songsInportantInfoArr=[];
						for(let i=0;i<res.result.songs.length;i++){
							let songSheetInportantInfo={
							id:res.result.songs[i].id,
							songName:res.result.songs[i].name,
							singerName:res.result.songs[i].artists[0].name,
							}
							songsInportantInfoArr.push(songSheetInportantInfo);
						}
						this.$store.commit("searchSongsInportantInfoArr",songsInportantInfoArr)
					})
				}else if(offset>0){
					getSearch(keywords,offset).then(res => {
						for(let i=0;i<res.result.songs.length;i++){
							let songSheetInportantInfo={
							id:res.result.songs[i].id,
							songName:res.result.songs[i].name,
							singerName:res.result.songs[i].artists[0].name,
							}
							this.$store.commit("searchSongsInportantInfoArrPush",songSheetInportantInfo)
							this.$refs.searchscroll.scroll.refresh();
						}
						this.$refs.searchscroll.scroll.finishPullUp();
						console.log(this.$store.state.searchSongsInportantInfoArr)
						})
				}
			},
			searchBack(){
				this.$router.push("\home");
			},
			delContent(){
				this.input="";
				this.$store.commit("delSearchSongs")
			},
			hotItemName(name){
				this.input=name;
			},
			delAllHistory(){
				this.$toast.show('是否清空历史记录?')
				//this.$store.commit("delAllHistory")
				this.$bus.$on("emptyClick",()=>{
					this.$store.commit("delAllHistory")
				})
			},
			delHistorySong(songName){
				this.$store.commit("delHistorySong",songName)
			},
			searchHistoryItemClick(searchName){
				this.input=searchName;
			},
			loadSongs(){
				this.offset=this.offset+1;
				this.getSearch(this.input,this.offset);
				this.$refs.searchscroll.scroll.refresh();
			},
			debounce(fun,delay){
	      let timer ;
	      return function(args){
	         const that = this
	         clearTimeout(timer)
	         timer = setTimeout(function(){
	             fun.call(that,args)
	         },delay)
	     }
	    },
	    inputfun(){
	    	if(this.input){
						this.closeShow=true;
						this.getSearch(this.input,this.offset);
						this.$router.push("/inputSearch")
						this.$store.commit("searchInput",this.input)
					}else{
						this.closeShow=false;
						this.$store.commit("searchInput",this.input)
						this.$router.push("/hotSearch")
						
					}
	    }
			},

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
	
	transform: translateX(100%);
  opacity: 0;
}
 .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.search{
		position: absolute;
	  z-index: 90;
	  top: 0;
	  left: 0;
	  bottom: 0;
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
.nav .el-icon-arrow-left,.el-icon-close{
	font-size: 24px;
}
.el-icon-close{
	line-height: 44px;
}
.searchInput{
	width: 100%;
	height: 100%;
	border: 0;
	padding: 0;
	outline: medium;
	background: rgba(255, 255, 255, 0);
	color: #f1f1f1;
}
input::-webkit-input-placeholder{
	color: rgba(255, 255, 255, 0.6);
}
.search-scroll{
	position: absolute;
	top: 44px;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
}
.search-history{
	position: relative;
	left: 20px;
	width: 87.5%;
}
.search-history .search-history-title{
	position: relative;
	height: 35px;
}
.search-history .search-history-title span{
	color: #757575;
	font-size: 12px;
	padding-left: 4px;
	position: absolute;
	left: 0;
	line-height: 35px;
}
.search-history .search-history-title .el-icon-delete{
	color: #2e3030;
	font-size: 16px;
	position: absolute;
	right: 0;
	top: 0;
	line-height: 35px;
}
.search-history .search-history-item{
	position: relative;
	color: #2e3030;
	font-size: 14px;
	height: 35px;
}
.search-history .search-history-item span{
	position: absolute;
	left: 0;
	padding-left: 4px;
	line-height: 35px;
}
.search-history .search-history-item i{
	position: absolute;
	right: 0;
	padding-left: 4px;
	line-height: 35px;
	font-size: 16px;
}
</style>