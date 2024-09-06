import { createI18n } from 'vue-i18n';
import zhMessages from '/src/i18n/locales/zh.json';
import msMessages from '/src/i18n/locales/ms.json';

function detectUserLocale() {
	const browserLanguage = navigator.language || navigator.userLanguage; // Get the user's browser/system language

	// If the language is Chinese (zh), set the locale to 'zh'
	if (browserLanguage.startsWith('zh')) {
		return 'zh';
	}

	// If the language is English (en) or Malay (ms), set the locale to 'ms'
	if (browserLanguage.startsWith('en') || browserLanguage.startsWith('ms')) {
		return 'ms';
	}

	// Default to 'zh' if no match
	return 'zh';
}

// Create i18n instance with messages
const i18n = createI18n({
	// locale: localStorage.getItem('user-locale') || getBrowserLocale(), // Set default locale from localStorage or browser
	locale: detectUserLocale(),
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
