// Sets icons and themes on load for appropriate theme.
// Also watches for changes to preferes-color-scheme and updates UI appropriatly.
((doc) => {
	// Static settings for website themes.
	const themes = {
		basepath: '/assets/icons/site/',
		dark: {
			browser: '#343636',
			favicons: [
				'darkfavicon.ico',
				'darkfavicon-32x32.png',
				'darkfavicon-16x16.png',
				'apple-touch-icon.png'
			],
		},
		light: {
			browser: '#0069b2',
			favicons: ['favicon.ico', 'favicon-32x32.png', 'favicon-16x16.png', 'apple-touch-icon.png'],
		},
	};

	// Theme Color: ex. rgb(255,255,255), black, green, #0069b2
	const themeColor = doc.querySelector('meta[name="theme-color"]');

	// Icon: ex. favicon.ico, homepage.png, wra.png
	const icons = doc.querySelectorAll('link[rel="icon"]');

	// Color Scheme: ex. dark, light
	const colorScheme = doc.querySelector('meta[name="color-scheme"]');
	const body = doc.body;

	// Set localstorage theme to arbitrary value
	function setDarkMode(darkMode) {
		let dm = darkMode || localStorage.darkMode || false;
		doc.documentElement.classList.toggle('dark', dm);
		themeColor.content = getComputedStyle(body).color;
		colorScheme.content = dm ? themes.dark.browser : themes.light.browser;
		icons.forEach((icon, idx) => {
			icon.href =
				themes.basepath +
				(dm ? themes.dark.favicons[idx] : themes.light.favicons[idx]);
		});

		console.log(`Dark mode is ${dm ? 'on' : 'off'}.`);
	}

	// Persist darkmode setting to localStorage will ignore media query.
	function saveDarkMode(darkMode) {
		localStorage.darkMode = darkMode;
	}

	// Clear darkmode setting from localstorage will fallback to media query.
	function clearDarkMode() {
		localStorage.removeItem('darkMode');
	}

	// Check to see if Media-Queries are supported
	if (window.matchMedia) {
		// Create Media Query for Darkmode Preference
		const darkModeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);

		// Send Dark Mode preference to Setter
		setDarkMode(darkModeMediaQuery.matches);

		// Watch for changes to prefers-color-scheme and update darkMode accordingly.
		darkModeMediaQuery.addEventListener('change', (e) => {
			setDarkMode(e.matches);
		});
	} else {
		// No support for media query set light as default.
		setDarkMode(false);
	}
})(document);
