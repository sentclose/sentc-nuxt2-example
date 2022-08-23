/**
 * @author Jörn Heinemann <joernheinemann@gmx.de>
 * @since 2022/08/23
 */

import {Module, VuexModule, Mutation} from "vuex-module-decorators";
import {Group as SentcGroup} from "@sentclose/sentc";

export interface GroupData {
	sentc: SentcGroup

	//your custom group data, which may be fetched from your backend
}

@Module({
	stateFactory: true
})
export default class Group extends VuexModule
{
	private groups: Map<string, GroupData> = new Map();

	private groups_to_fetch: string[] = [];

	/**
	 * The groups to fetch for the group plugin
	 * only in the client because only the client got the keys to decrypt the group
	 */
	get getGroupsToFetch() {
		return this.groups_to_fetch;
	}

	get group() {
		return (group_id: string) => {
			return this.groups.get(group_id);
		};
	}

	/**
	 * This is only set when try to fetch the group on server.
	 *
	 * Only the client can decrypt the group
	 *
	 * @param groups
	 */
	@Mutation
	public setGroupsToFetch(groups: string[])
	{
		this.groups_to_fetch = groups;
	}

	@Mutation
	public setGroups(groups: SentcGroup[])
	{
		for (let i = 0; i < groups.length; i++) {
			const group = groups[i];

			this.groups.set(group.data.group_id, {
				sentc: group
			});
		}
	}
}