<template>
	<transition name="fade">
		<div v-if="visible" class="pop-up-notification">
			<div class="images-container">
				<img :src="notification.image1" alt="icon1" class="image1" />
				<img :src="notification.image2" alt="icon2" class="image2" />
			</div>
			<span>{{ notification.text }}</span>
			<button class="close-btn" @click="closeNotification">×</button>
		</div>
	</transition>
</template>

<script>
export default {
	props: ['notification', 'visible'],
	methods: {
		closeNotification() {
			this.$emit('close');
		},
	},
};
</script>

<style scoped>
.pop-up-notification {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 200px;
	height: 60px;
	border-radius: 5px;
	border: 1px solid #FFF;
	background: linear-gradient(180deg, #031379 0%, #010F64 100%);
	color: white;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin: 10px;
	z-index: 998;
}

.images-container {
	position: relative;
	width: 60px;
	height: 60px;
}

.image1,
.image2 {
	width: 100%;
	height: auto;
	position: absolute;
	bottom: 0;
	left: 0;
}

.image2 {
	width: 130%;
	left: -10px;
	bottom: -6px;
	z-index: 9999;
	/* Bring image2 to the front */
}

span {
	color: #FFF;
	font-size: 12px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	width: 75%;
	text-align: left;

}

.close-btn {
	background: transparent;
	border: none;
	color: white;
	font-size: 20px;
	cursor: pointer;
	position: absolute;
	right: 6px;
	top: -6px;
	padding: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
