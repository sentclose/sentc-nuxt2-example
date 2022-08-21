import {Middleware} from "@nuxt/types";

const getUser: Middleware = async ({store}) => {
	const init = store.getters["user/User/isInit"];

	if (init) {
		return;
	}

	await store.dispatch("user/User/initUser");
};

export default getUser;