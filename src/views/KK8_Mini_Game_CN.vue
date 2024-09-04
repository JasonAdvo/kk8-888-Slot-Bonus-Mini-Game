<template>
	<!-- Game Sound -->
	<audio id="game-bgm" src="/audio/Children Game Loop.wav" preload="auto" loop></audio>
	<audio id="spin-sound" src="/audio/Ding.wav" preload="auto"></audio>
	<audio id="play-sound" src="/audio/Click.wav" preload="auto"></audio>
	<audio id="win-sound" src="/audio/Win.wav" preload="auto"></audio>

	<!-- Main -->
	<div class="fix-mobile-size">
		<div class="Game_Background">
			<div class="container">
				<div class="Top_Title_Image_Container">
					<img class="Title" src="/Images/title.webp" alt="Big Title">
				</div>

				<i class="material-icons GT-icons" @click="togglePopup">g_translate</i>
				<div v-if="isPopupVisible" class="popup">
					<ul>
						<li><router-link :to="{ path: '/', query: { lang: 'zh' } }">中文</router-link></li>
						<li><router-link :to="{ path: '/my', query: { lang: 'my' } }">Malay</router-link></li>
					</ul>
				</div>


				<div class="Middle_Ribbon_Container">
					<img class="left_ribbon" src="/Images/Left_Ribbon.webp" alt="">
					<img class="right_ribbon" src="/Images/Right_Ribbon.webp" alt="">
				</div>

				<div class="Inner_Main_Frame_Container">
					<div class="Main_Frame">
						<img src="/Images/Main_Inner_Frame.webp" alt="">
						<div class="Main_Game_Container">
							<div class="Game_Inner_Container">
								<div class="grid">
									<!-- Top-left to Top-right boxes -->
									<div class="box" v-for="(box, index) in boxes.slice(0, 3)" :key="index"
										:class="{ selected: box.selected, blink: box.blinking }">
										<img :src="box.selected ? box.selectedImage : box.nonSelectedImage" />
									</div>
									<!-- Middle-left box -->
									<div class="box" v-for="(box, index) in boxes.slice(3, 4)" :key="index + 3"
										:class="{ selected: box.selected, blink: box.blinking }">
										<img :src="box.selected ? box.selectedImage : box.nonSelectedImage" />
									</div>
									<!-- Middle (blank space) -->
									<div class="middle-blank"></div>
									<!-- Middle-right box -->
									<div class="box" v-for="(box, index) in boxes.slice(4, 5)" :key="index + 4"
										:class="{ selected: box.selected, blink: box.blinking }">
										<img :src="box.selected ? box.selectedImage : box.nonSelectedImage" />
									</div>
									<!-- Bottom-left to Bottom-right boxes -->
									<div class="box" v-for="(box, index) in boxes.slice(5, 8)" :key="index + 5"
										:class="{ selected: box.selected, blink: box.blinking }">
										<img :src="box.selected ? box.selectedImage : box.nonSelectedImage" />
									</div>
									<!-- Start button in the middle -->
									<button @click="startGame" class="middle-button">点击</button>
								</div>

							</div>
						</div>
					</div>


					<div>
						<img class="star" src="/Images/Star.webp" alt="">
					</div>

				</div>

				<div class="Btm_Time_Chance_Container">
					<div class="Chance_Container">
						有 ( {{ chancesLeft }} ) 次免费机会
					</div>
					<div class="Time_Container">

						<div class="countdown-wrapper">
							<div class="countdown">
								<div class="word">
									倒计时
								</div>
								<div class="digit-group">
									<div class="digit">{{ minutes[0] }}</div>
									<div class="digit">{{ minutes[1] }}</div>
								</div>
								<div class="word"> 分 </div>
								<div class="digit-group">
									<div class="digit">{{ seconds[0] }}</div>
									<div class="digit">{{ seconds[1] }}</div>
								</div>
								<div class="word">
									秒
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Overlay -->
				<div class="overlay" v-if="showPopup"></div>

				<!-- Pop-up Card -->
				<div class="popup-card" v-if="showPopup">
					<div class="relative">
						<!-- Conditionally render the lucky image -->
						<img v-if="showLuckyImage" class="lucky" src="/Images/LuckyReward.webp" alt="Lucky Reward">
					</div>
					<div class="popup-content">
						<p>{{ popupMessage_1 }}</p>
						<p>{{ popupMessage_2 }}</p>
						<button @click="closePopup">{{ popupButtonText }}</button>
					</div>
				</div>


			</div>

			<div class="RewardList_Container">
				<PopUpNotification v-for="(notification, index) in notifications" :key="index"
					:notification="notification" :visible="index === currentIndex" @close="handleClose" />
			</div>

			<div class="Btm_Img_Comtainer">
				<img class="Btm_Money" src="/Images/Btm_Money.webp" alt="">
				<img class="Left_Present" src="/Images/Left_Present.webp" alt="">
				<img class="Right_Present" src="/Images/Right_Present.webp" alt="">
			</div>
		</div>

	</div>
</template>

<script>
import PopUpNotification from '/src/components/PopUpNotification.vue';
import { ref } from 'vue';


export default {
	components: {
		PopUpNotification,
	},
	data() {
		return {
			boxes: [
				{ selectedImage: '/Images/888_Y.webp', nonSelectedImage: '/Images/888_B.webp', selected: false },
				{ selectedImage: '/Images/50_Y.webp', nonSelectedImage: '/Images/50_B.webp', selected: false },
				{ selectedImage: '/Images/retry_Y.webp', nonSelectedImage: '/Images/retry_B.webp', selected: false },
				{ selectedImage: '/Images/388_Y.webp', nonSelectedImage: '/Images/388_B.webp', selected: false },
				{ selectedImage: '/Images/200_Y.webp', nonSelectedImage: '/Images/200_B.webp', selected: false },
				{ selectedImage: '/Images/retry_Y.webp', nonSelectedImage: '/Images/retry_B.webp', selected: false },
				{ selectedImage: '/Images/Free_10_Y.webp', nonSelectedImage: '/Images/Free_10_B.webp', selected: false },
				{ selectedImage: '/Images/25_Y.webp', nonSelectedImage: '/Images/25_B.webp', selected: false },
			],
			notifications: [
				{
					image1: '/Images/Money_Bg.webp', image2: '/Images/CSY.webp', text: '恭喜用户 xxx8422 赢得 888% 特别老虎机奖金'
				},
				{
					image1: '/Images/Money_Bg.webp', image2: '/Images/Penguin.webp', text: '恭喜用户 xxx1119 赢得 888% 特别老虎机奖金'
				},
				{
					image1: '/Images/Money_Bg.webp', image2: '/Images/Mouse.webp', text: '恭喜用户 xxx1306 赢得 888% 特别老虎机奖金'
				},
				{
					image1: '/Images/Money_Bg.webp', image2: '/Images/Shark.webp', text: '恭喜用户 xxx6769 赢得 388% 迎新奖金'
				},
				{
					image1: '/Images/Money_Bg.webp', image2: '/Images/Panda.webp', text: '恭喜用户 xxx1729 赢得 50% 无限老虎机充值奖金'
				},
			],
			currentIndex: 0,
			interval: null,
			intervalId: null,
			intervalIdTime: null,
			showPopup: false,
			popupMessage_1: '',
			popupMessage_2: '',
			popupButtonText: '',
			showLuckyImage: false,
			gameStarted: false,
			chancesLeft: 2,
			time: 600000, // Example: 10 minute in milliseconds
			minutes: '00',
			seconds: '00',
			isPopupVisible: false,
			bgm: null,       // Store the Audio object
			isPlayingBGM: false, // Track if BGM is playing
			bgmSound: null,
			isPlayingbgmSound: false,
		};
	},
	methods: {
		togglePopup() {
			this.isPopupVisible = !this.isPopupVisible;
		},
		startBlinking() {
			this.intervalId = setInterval(() => {
				this.boxes.forEach(box => box.selected = !box.selected);
			}, 500); // Blink every 500ms
		},
		startGame() {

			// const hasBGMPlayed = ref(sessionStorage.getItem('hasBGMPlayed') === 'true');
			// console.log(hasBGMPlayed.value)

			// if (!hasBGMPlayed.value) {
			this.playBGM();
			// }

			if (this.chancesLeft <= 0) {
				alert("No more chances left!"); // Notify the user when out of chances
				return;
			}

			if (this.intervalId) {
				clearInterval(this.intervalId);
			}
			this.gameStarted = true;

			// Play the button click sound
			const playSound = new Audio('/audio/Click.wav');
			playSound.currentTime = 0; // Reset to start of sound
			playSound.play();

			const circularOrder = [0, 1, 2, 4, 7, 6, 5, 3]; // Indices for circular movement
			let currentIndex = 0;

			const spinInterval = setInterval(() => {

				this.boxes.forEach(box => box.selected = false);
				this.boxes[circularOrder[currentIndex]].selected = true;
				currentIndex = (currentIndex + 1) % circularOrder.length;

				const spinSound = new Audio('/audio/Ding.wav');
				spinSound.currentTime = 0;
				spinSound.play();

			}, 100); // Speed of spinning

			// Determine spin time and final index based on chances left
			let spinTime, finalIndex;
			if (this.chancesLeft === 2) {
				spinTime = 3100; // First spin time
				finalIndex = 5; // First chance results in box 5
			} else if (this.chancesLeft === 1) {
				spinTime = 3300; // Second spin time
				finalIndex = 0; // Second chance results in box 0
			}

			setTimeout(() => {
				clearInterval(spinInterval);

				this.boxes.forEach(box => {
					box.selected = false;
					box.blinking = false; // Ensure blinking is reset
				});

				const finalBox = this.boxes[finalIndex];
				finalBox.selected = true;
				finalBox.blinking = true; // Set blinking flag

				// After the blink animation completes, show the popup
				setTimeout(() => {
					finalBox.blinking = false; // Remove blinking flag
					this.showLuckyImage = false; // Reset showLuckyImage

					// Show popup with a custom message based on the final index
					if (finalIndex === 5) {
						this.popupMessage_1 = "抱歉！请再尝试！";
						this.popupMessage_2 = "还有 (1) 次免费机会";
						this.popupButtonText = "再次挑战";
						this.showPopup = true;
						// Ensure lucky image is not shown
						this.showLuckyImage = false;
					} else if (finalIndex === 0) {
						this.popupMessage_1 = "恭喜你获得";
						this.popupMessage_2 = "888% 特别老虎机奖金";
						this.popupButtonText = "立即领取";
						this.showPopup = true;
						this.showLuckyImage = true; // Show the lucky image

						// Play win sound if the user lands on the 0th box
						const winSound = document.getElementById('win-sound');
						winSound.currentTime = 0; // Reset to start of sound
						winSound.play();
					}

					// Decrement the chances left after each game
					this.chancesLeft--;

				}, 1000); // Delay showing popup after blinking (0.1s per blink * 3 blinks + buffer)

			}, spinTime); // Dynamic spin time
		},
		closePopup() {
			this.showPopup = false;
			// Optionally reset the lucky image flag
			this.showLuckyImage = false;
		},
		closePopup() {
			this.showPopup = false;
		},
		updateTime() {
			const now = Date.now();
			const end = now + this.time;
			const update = () => {
				const remaining = end - Date.now();
				if (remaining <= 0) {
					clearInterval(this.intervalIdTime);
					this.minutes = '00';
					this.seconds = '00';
					return;
				}
				const minutes = Math.floor(remaining / (1000 * 60));
				const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

				this.minutes = String(minutes).padStart(2, '0');
				this.seconds = String(seconds).padStart(2, '0');
			};
			update();
			this.intervalIdTime = setInterval(update, 1000);
		},
		startNotificationSequence() {
			this.interval = setInterval(() => {
				this.currentIndex++;
				if (this.currentIndex >= this.notifications.length) {
					this.currentIndex = 0; // Reset to start the loop again
				}
			}, 2000); // 2 seconds interval
		},
		handleClose() {
			clearInterval(this.interval);
			this.currentIndex = this.notifications.length; // Stop further notifications
		},
		playBGM() {
			if (!this.isPlayingBGM) {
				// If BGM is not already playing, start playing it
				this.bgm = new Audio('/audio/Children Game Loop.wav');
				this.bgm.currentTime = 0;
				this.bgm.loop = true;  // Set loop to true
				this.bgm.play();
				this.isPlayingBGM = true; // Set the flag to true
			}
		},
		pauseBGM() {
			if (this.isPlayingBGM && this.bgm) {
				// Pause the BGM if it's playing
				this.bgm.pause();
				if (this.bgmSound && this.isPlayingbgmSound) {
					this.bgmSound.pause();
				}
				// this.bgmSound.pause();
				this.isPlayingBGM = false; // Reset the flag
			}
		},
	},
	mounted() {
		this.startBlinking(); // Start blinking when the component is mounted
		this.updateTime();
		this.startNotificationSequence();
		// this.playBGM();
	},
	beforeDestroy() {
		if (this.intervalIdTime) {
			clearInterval(this.intervalIdTime);
		}
		clearInterval(this.interval);
	},
	beforeRouteLeave(to, from, next) {
		// Pause the BGM before leaving the route
		this.pauseBGM();
		next(); // Proceed with the navigation
	}
};
</script>

<style scoped>
/* Main CSS */
.fix-mobile-size {
	max-width: 540px;
	align-self: center;
	position: relative;
	overflow: visible;
}

.Game_Background {
	background-image: url('/Images/Bg_Img.webp');
	background-size: cover;
	/* Ensures the image covers the entire element */
	background-position: center;
	background-repeat: no-repeat;
	width: 100vw;
	max-width: 540px;
	height: 100vh;
	position: relative;
	/* Place it behind other content */
}

.container {
	position: relative;
}

.Title {
	width: 80%;
	max-width: 400px;
	z-index: 50;
	position: relative;
}

.GT-icons {
	position: absolute;
	top: 20px;
	right: 15px;
	color: white;
	z-index: 51;
}

.popup {
	position: absolute;
	top: 40px;
	/* Adjust as needed */
	right: 0;
	border: 1px solid #ccc;
	background: white;
	padding: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	z-index: 9999;
}

.popup ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.popup li {
	margin: 5px 0;
}

.popup a {
	text-decoration: none;
	color: #333;
}

.Middle_Ribbon_Container img {
	position: absolute;
}

.left_ribbon {
	width: 50%;
	left: 0;
	top: -15%;
}

.right_ribbon {
	width: 50%;
	right: 0;
	top: -13%;
}

.Inner_Main_Frame_Container {
	position: relative;
}

.Main_Frame {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.Main_Frame img {
	width: 80%;
	max-width: 400px;
}

.Main_Game_Container {
	position: absolute;
	margin: 0 10%;
	max-width: 400px;
	padding-top: 38%;
	width: 80%;
}

.star {
	position: absolute;
	top: -4%;
	left: 50%;
	transform: translateX(-46%);
	width: 15%;
}

.Game_Inner_Container {
	margin: 0 9% 9%;
}

.Game_Inner_Container .grid {
	display: grid;
	grid-template-columns: repeat(3, 33%);
	grid-template-rows: repeat(3, 33%);
	position: relative;
	place-content: center;
	width: 100%;
	height: 100%;
	gap: 5px;
}

.Game_Inner_Container .box {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
}

.Game_Inner_Container .middle-blank {
	width: 100%;
	height: 100%;
	background-color: unset;
}

.Game_Inner_Container .middle-button {
	grid-column: 2 / 3;
	grid-row: 2 / 3;
	width: 100%;
	height: 100%;
	z-index: 10;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: unset;
	color: white;
	border: none;
	/* Remove the border */
	cursor: pointer;
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: 15.568px;
	outline: none;
	/* Remove the outline */
	box-shadow: none;
	/* Remove any box-shadow */
	padding: 0;
}

.Btm_Time_Chance_Container {
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 5px auto 0;

}

.Chance_Container {
	display: flex;
	color: #FFF;
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: 15.568px;
	/* 97.299% */
}

.Time_Container {
	margin-top: 5px;
}

.countdown-wrapper {
	font-family: Arial, sans-serif;
}

.countdown {
	display: flex;
	align-items: center;
}

.digit-group {
	display: flex;
}

.digit {
	margin: 0 3px;
	border-radius: 5px;
	padding: 11px 9px;
	background: #f0f0f0;
	color: #FFF;
	text-align: center;
	text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.70);
	font-family: Montserrat;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 15.568px;
	background-image: url('/Images/Time_Box.webp');
	background-size: contain;
	/* 64.866% */
}

.word {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: 15.568px;
	/* 97.299% */
	margin: 0 5px;
}

/* Overlay styling */
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	/* Semi-transparent black */
	z-index: 999;
	/* Ensure it appears behind the popup but above other content */
}

.popup-card {
	width: 70%;
	max-width: 400px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	z-index: 1000;
}

.lucky {
	position: absolute;
	width: 90%;
	max-width: 300px;
	top: -120px;
	left: 50%;
	transform: translateX(-50%);
}

.popup-content {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.popup-content p {
	color: #000;
	text-align: center;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: 0.6px;
	margin: 0;
}

.popup-content button {
	margin-top: 10px;
	padding: 5px 15px;
	color: #000;
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 116.5%;
	/* 18.64px */
	border-radius: 8.189px;
	background: #DBECFF;
	display: flex;
	padding: 10px 50px;
	justify-content: center;
	align-items: center;
	gap: 20px;
}

.Btm_Money {
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
}

.Left_Present {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 35%;
}

.Right_Present {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 35%;
}

/* Add this to your CSS file */
.blink {
	animation: blink-animation 0.3s step-start 3;
}

@keyframes blink-animation {
	50% {
		opacity: 0;
	}
}

/* Min-Width 380px */
@media screen and (min-width: 380px) {

	.lucky {
		top: -130px;
	}

	.Game_Inner_Container .middle-button {
		font-size: 18px;
	}

	.word {
		font-weight: 16px;
	}
}

/* Min-Width 415px */
@media screen and (min-width: 415px) {
	.container {
		padding-top: 20%;
	}

	.left_ribbon {
		top: -4%;
	}

	.right_ribbon {
		top: -2%;
	}
}

/* Min-Width 425px */
@media screen and (min-width: 425px) {

	.Game_Inner_Container .middle-button {
		font-size: 20px;
	}
}

/* Min-Width 540px */
@media screen and (min-width: 540px) {
	.Game_Inner_Container .middle-button {
		font-size: 24px;
	}
}
</style>