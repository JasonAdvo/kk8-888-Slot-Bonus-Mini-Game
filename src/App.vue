<template>
	<!-- <Mini_Game_CH /> -->
	<!-- <Mini_Game_MY /> -->
	<router-view></router-view>
</template>

<script setup>
import Mini_Game_CH from './views/KK8_Mini_Game_CN.vue'
import Mini_Game_MY from './views/KK8_Mini_Game_MY.vue'
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
