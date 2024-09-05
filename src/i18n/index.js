import { createI18n } from 'vue-i18n';
import zhMessages from '/src/i18n/locales/zh.json';
import msMessages from '/src/i18n/locales/ms.json';

function getBrowserLocale() {
	const navigatorLang = navigator.language || navigator.userLanguage;
	const locale = navigatorLang.split('-')[0]; // Extract language code (e.g., 'zh', 'ms')
	return locale;
}

// Create i18n instance with messages
const i18n = createI18n({
	locale: localStorage.getItem('user-locale') || getBrowserLocale(), // Set default locale from localStorage or browser
	fallbackLocale: 'zh', // Default fallback language (Mandarin)
	messages: {
		zh: zhMessages,
		ms: msMessages,
	},
});

// Function to switch languages
export function switchLanguage(lang) {
	i18n.global.locale = lang; // Set locale directly without .value
	localStorage.setItem('user-locale', lang); // Store user preference in localStorage
}

export default i18n;
