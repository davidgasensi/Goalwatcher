/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			"gw-white": "#EDF2F4",
			"gw-red": "#EF233C",
			"gw-red-accent": "#D90429",
			"gw-grey": "#353b48",
			"gw-grey2": "#8D99AE",
			"gw-yellow-winner": "#f9ca24",
			"gw-blue-champions": "#3867d6",
			"gw-orange-uefa": "#ff793f",
			"gw-green-conference": "#10ac84",
			"gw-red-descenso": "#ee5253"

		 },
	},
	plugins: [require("daisyui")],
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
		themes: [
			{
				mytheme: {
					"base-100": "#EDF2F4",
					"text-white-gw": "#EDF2F4",
					"text-red-gw": "#EF233C",
					"background-grey-gw": "#353b48"
				}
			},
		],
	 },
}
