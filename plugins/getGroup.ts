import {Context} from "@nuxt/types";
import {Group, User} from "@sentclose/sentc";

export default async function({store}: Context) {
	if (!process.client) {
		return;
	}

	const groups_to_fetch: string[] = store.getters["group/Group/getGroupsToFetch"];

	if (groups_to_fetch.length === 0) {
		return;
	}

	const init = store.getters["user/User/isInit"];

	if (!init) {
		return;
	}

	/**
	 * Get the user from the store and fetch the groups for this user
	 */
	const user: User = store.getters["user/User/getUser"];

	const p = [];

	for (let i = 0; i < groups_to_fetch.length; i++) {
		const group_to_fetch = groups_to_fetch[i];

		p.push(user.getGroup(group_to_fetch));
	}
	
	const groups: Group[] = await Promise.all(p);

	store.commit("group/Group/setGroups", groups);
}