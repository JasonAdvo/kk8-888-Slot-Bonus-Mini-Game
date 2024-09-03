import { createRouter, createWebHistory } from 'vue-router';

import kk8_Mini_Game_zh from '/src/views/KK8_Mini_Game_CN.vue';
import kk8_Mini_Game_my from '/src/views/KK8_Mini_Game_MY.vue';

const routes = [
	{
		path: '/',
		name: 'KK8 Mini Game ZH',
		component: kk8_Mini_Game_zh
	},
	{
		path: '/my',
		name: 'KK8 Mini Game MY',
		component: kk8_Mini_Game_my
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;