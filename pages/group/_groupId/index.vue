<template>
	<v-card v-if="group && group.sentc && group.sentc.data">
		<client-only>
			<v-card-title>
				<h2 class="heading">Group: {{ group.sentc.data.group_id }}</h2>
			</v-card-title>

			<v-card-text>
				<p>Group created: {{ getTime(group.sentc.data.create_time) }}</p>
				<p>Joined: {{ getTime(group.sentc.data.joined_time) }}</p>
			</v-card-text>
		</client-only>
	</v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Context} from "@nuxt/types";
import {Action, Getter} from "nuxt-property-decorator";
import {User} from "@sentclose/sentc";
import {GroupData} from "~/store/group/Group";

@Component({
	asyncData({params, redirect}: Context) {
		const group_id = params.groupId;

		if (!group_id || group_id === "") {
			return redirect("/");
		}

		return {
			group_id
		};
	},
	fetchOnServer: false,
	async fetch() {
		this.group = this.getGroup(this.group_id);

		if (!this.group) {
			//group was not fetched before
			this.group = await this.fetchGroup(this.group_id);
		}
	}
})
export default class extends Vue
{
	private group_id = "";

	//vue won't listen for updates for this group. if updates are required then save the group data here
	//@ts-ignore
	private group: GroupData = "";

	@Getter("group/Group/group")
	private getGroup: (group_id: string) => GroupData | undefined;

	@Getter("user/User/getUser")
	private getUser: User;

	@Action("group/Group/fetchGroup")
	private fetchGroup: (group_id: string) => Promise<GroupData>;

	private getTime(timestamp) {
		const d = new Date(+timestamp);

		return d.toLocaleString([], {
			hour12: false,
			month: "short",
			year: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "numeric"
		});
	}
}
</script>

<style scoped>

</style>