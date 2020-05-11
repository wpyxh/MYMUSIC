<template>
	<div class="banner bannerTop">
		 <div class="block">
    <el-carousel trigger="click" :height="screenWidth+'px'">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
       <img v-lazy="banners[index].picUrl"/>
      </el-carousel-item>
    </el-carousel>
  </div>
	</div>
</template>

<script>
	export default{
		props:{
			banners:{
				type:Array,
				default(){
					return []
			}
		}
		},
		data(){
			return{
				screenWidth:document.body.clientWidth/2.6,
			}
		},
		mounted () {
    const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth/2.6
        })()
    }
},
		watch:{
    screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenWidth = val
            this.timer = true
            let that = this
            setTimeout(function(){
                // 打印screenWidth变化的值
                //console.log(that.screenWidth)
                that.timer = false
            },400)
        }
    }
}
	}
</script>

<style>
	.banner{
		width: 100%;
		height: 115px;
		background: #d44439;
		border-bottom: 5px solid #f1f1f1;
	}
	.block{
		width: 96%;
		margin: auto;
		
	}
	.el-carousel{
		border-radius: 5px;
	}
  .block img{
  	width: 100%;
  	height: 100%;
  }
  
  .el-carousel__indicators {
		width: 80%;
		text-align: center;
	}
	 .el-carousel__indicators li {
		display: inline-block;
		padding: 12px 4px;
	}
	 .el-carousel__indicators li .el-carousel__button{
		border-radius: 50%;
		width: 10px;
		height: 10px;
	}
</style>