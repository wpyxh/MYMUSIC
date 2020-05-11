<template>
	<div class="nav-bar">
		<div class="left"><slot name='left'></slot></div>
		<div class="between"><slot name='between'></slot></div>
		<div class="right"><slot name='right'></slot></div>
	</div>
</template>

<script>
</script>

<style scoped>
	.nav-bar{
		width: 100%;
		height: 44px;
		display: flex;
		text-align: center;
		background: #d44439;
    color: #f1f1f1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
	}
	.left,.right{
		height: 44px;
		width: 60px;
		line-height: 44px;
		cursor: pointer;
	}
	.left{
		line-height: 55px;
	}
	.between{
		text-align: center;
		height: 44px;
		flex: 1;
		font-size: 14px;
		line-height: 44px;
	}
</style>