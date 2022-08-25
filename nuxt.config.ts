import colors from "vuetify/es5/util/colors";
import {NuxtConfig} from "@nuxt/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const wasmOutDir = path.resolve(__dirname, "../../../sdk/implementation/js/sentc_wasm/pkg");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const copyWebpackPlugin = require("copy-webpack-plugin");

const config: NuxtConfig = {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: true,

	// Target: https://go.nuxtjs.dev/config-target
	target: "server",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: "%s - sentc_nuxt",
		title: "sentc_nuxt",
		meta: [
			{charset: "utf-8"},
			{name: "viewport", content: "width=device-width, initial-scale=1"},
			{hid: "description", name: "description", content: ""},
			{name: "format-detection", content: "telephone=no"}
		],
		link: [
			{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		"~/plugins/axios-accessor",
		{src: "~/plugins/getUser.ts", mode: "client"},
		//important that this comes after getUser because we need the user to get the groups
		{src: "~/plugins/getGroup.ts", mode: "client"}
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		"@nuxt/typescript-build",
		// https://go.nuxtjs.dev/vuetify
		"@nuxtjs/vuetify"
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa"
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: "/"
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: "en"
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		//customVariables: ["~/assets/variables.scss"],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: false,

		extend(config) {
			// @ts-ignore
			config.resolve.mainFields = ["main"];
		},

		//copy the wasm file to your static dir to serve it from the server
		plugins: [
			// eslint-disable-next-line new-cap
			new copyWebpackPlugin({
				patterns: [
					{
						from: wasmOutDir + "/sentc_wasm_bg.wasm",
						to: path.resolve(__dirname, "static")
					}
				]
			})
		]
	}
};

export default config;