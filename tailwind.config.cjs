const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#E0E2DC',
					dark: '#2D2F31'
				},
				secondary: {
					light: '#598392'
				},
				tertiary: {
					light: '#F0A776'
				},
				quaternary: {
					light: '#E16C46'
				},
				quinary: {
					light: '#DA7635'
				},
				senary: {
					light: '#E24E1B'
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
