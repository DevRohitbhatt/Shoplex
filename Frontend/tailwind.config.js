/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', '../Frontend/src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
