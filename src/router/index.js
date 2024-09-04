import { createRouter, createWebHistory } from 'vue-router';
import { detectLanguage } from '../utils/languageDetection';

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

// Language preference logic using localStorage
router.beforeEach((to, from, next) => {
	// Check if the user is navigating manually
	const manualLangChange = to.query.lang;
	const storedLang = localStorage.getItem('preferredLanguage');
	const detectedLang = detectLanguage();

	if (manualLangChange) {
		// If the user is manually changing the language, store the preference
		localStorage.setItem('preferredLanguage', manualLangChange);
		next();
	} else if (storedLang) {
		// If a language preference is stored, use it
		if (storedLang === 'my' && to.path !== '/my') {
			next('/my');
		} else if (storedLang === 'zh' && to.path !== '/') {
			next('/');
		} else {
			next(); // Proceed if the path matches the stored language
		}
	} else {
		// No stored preference, proceed with automatic detection
		if (detectedLang === 'my' && to.path === '/') {
			next('/my');
		} else if (detectedLang === 'zh' && to.path === '/my') {
			next('/');
		} else {
			next(); // Continue to the requested route
		}
	}
});

export default router;
