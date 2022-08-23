import {Context} from "@nuxt/types";
import Sentc from "@sentclose/sentc";

/**
 * It is important to init the user in a client plugin, because ssr on true can't handle import.meta.url
 * @param store
 */
export default async function({store}: Context) {
	if (!process.client) {
		return;
	}

	const is_init = store.getters["user/User/isInit"];

	if (is_init) {
		return;
	}

	const user = await Sentc.init({
		// @ts-ignore -> env must be set
		app_token: process.env.NUXT_ENV_APP_PUBLIC_TOKEN,
		base_url: process.env.NUXT_ENV_BASE_URL,
		wasm_path: "/sentc_wasm_bg.wasm"
	});

	store.commit("user/User/setInit", true);

	if (!user) {
		store.commit("user/User/setLoginStatus", false);
		return;
	}

	store.commit("user/User/setLoginStatus", true);
	store.commit("user/User/setUser", user);
}