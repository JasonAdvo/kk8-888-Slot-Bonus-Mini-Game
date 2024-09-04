// src/utils/languageDetection.js
export function detectLanguage() {
	const language = navigator.language || navigator.userLanguage;
	console.log('Detected language:', language); // Debug: log the detected language

	if (language.startsWith('zh')) {
		return 'zh'; // Mandarin
	} else if (language.startsWith('ms') || language.startsWith('en')) {
		return 'my'; // Malay or English
	} else {
		return 'my'; // Default to Malay version if language is unknown
	}
}