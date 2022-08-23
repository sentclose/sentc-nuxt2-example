import {Middleware} from "@nuxt/types";

const getUser: Middleware = async ({store}) => {
	if (process.server) {
		console.log("server");

		return;
	}

	const init = store.getters["user/User/isInit"];

	if (init) {
		return;
	}

	await store.dispatch("user/User/initUser");
};

export default getUser;