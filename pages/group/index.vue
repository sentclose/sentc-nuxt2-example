<template>
	<v-row justify="center" align="center">
		<v-col cols="12" sm="8" md="6">
			<v-card class="logo py-4 d-flex justify-center">
				<h1 class="display-1">Create group</h1>
			</v-card>

			<v-card>
				<v-form @submit.prevent="createGroup">
					<v-card-actions>
						<v-btn text color="success" type="submit">create group</v-btn>
					</v-card-actions>
				</v-form>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Getter, Mutation} from "nuxt-property-decorator";
import {Group, User} from "@sentclose/sentc";
import {GroupList} from "@sentclose/sentc/lib/Enities";

@Component
export default class extends Vue
{
	@Getter("user/User/getUser")
	private getUser: User;

	@Mutation("user/User/pushUserGroupList")
	private pushUserGroupList: (items: GroupList[]) => void;

	@Mutation("group/Group/setGroups")
	private setGroups: (groups: Group[]) => void;

	private async createGroup()
	{
		const user = this.getUser;

		if (!user) {
			return;
		}

		/*
		Create a group
		 */
		const group_id = await user.createGroup();

		/*
		Fetch a group
		 */
		const group = await user.getGroup(group_id);

		//push the group id, so it will show in the group list
		this.pushUserGroupList([{
			group_id,
			//@ts-ignore -> ignore here because in data the time is already a string (for fetching groups etc)
			joined_time: group.data.joined_time,
			rank: group.data.rank,
			//@ts-ignore
			time: group.data.create_time,
			parent: group.data.parent_group_id
		}]);

		this.setGroups([group]);

		//go the group page
		return this.$router.push("/group/" + group_id);
	}
}
</script>

<style scoped>

</style>