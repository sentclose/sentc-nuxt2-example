<template>
	<div>
		<v-card v-if="group && group.sentc && group.sentc.data">
			<client-only>
				<v-card-title>
					<h2 class="heading">Group: {{ group.sentc.data.group_id }}</h2>
				</v-card-title>

				<v-card-text>
					<p>Group created: {{ getTime(group.sentc.data.create_time) }}</p>
					<p>Joined: {{ getTime(group.sentc.data.joined_time) }}</p>
				</v-card-text>

				<v-divider />

				<v-card-actions>
					<v-text-field v-model="member_id" style="max-width: 500px" label="New member" append-outer-icon="mdi-plus" @click:append-outer="addMember" />
				</v-card-actions>

				<v-card-actions>
					<v-spacer />

					<v-btn color="error" text @click="deleteGroup">Delete</v-btn>
				</v-card-actions>
			</client-only>
		</v-card>

		<br>

		<!--Encrypt a string-->

		<v-card>
			<v-card-title>
				<h3>Encrypt a text</h3>
			</v-card-title>

			<v-card-text>
				<v-textarea v-model="text" label="Text" />
			</v-card-text>

			<v-card-actions>
				<v-btn text @click="encrypt">encrypt</v-btn>
			</v-card-actions>
		</v-card>

		<br>
		<!--Decrypt a string-->

		<v-card>
			<v-card-title>
				<h3>Decrypt a text</h3>
			</v-card-title>

			<v-card-text>
				<v-textarea v-model="encrypted_text" label="Encrypted text" />
			</v-card-text>

			<v-card-actions>
				<v-btn text @click="decrypt">decrypt</v-btn>
			</v-card-actions>
		</v-card>

		<br>

		<v-card>
			<v-card-title>
				<h3>Decrypted text</h3>
			</v-card-title>

			<v-card-text>
				<v-textarea v-model="decrypted_text" label="decrypted text" />
			</v-card-text>
		</v-card>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Context} from "@nuxt/types";
import {Action, Getter, Mutation} from "nuxt-property-decorator";
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

	private member_id = "";

	private text = "";
	private encrypted_text = "";
	private decrypted_text = "";

	//vue won't listen for updates for this group. if updates are required then save the group data here
	//@ts-ignore
	private group: GroupData = "";

	@Getter("group/Group/group")
	private getGroup: (group_id: string) => GroupData | undefined;

	@Getter("user/User/getUser")
	private getUser: User;

	@Mutation("user/User/removeGroup")
	private removeUserGroup: (id: string) => void;

	@Action("group/Group/fetchGroup")
	private fetchGroup: (group_id: string) => Promise<GroupData>;

	private getTime(timestamp)
	{
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

	private async deleteGroup()
	{
		await this.group.sentc.deleteGroup();

		this.removeUserGroup(this.group_id);

		return this.$router.push("/group");
	}

	private async addMember()
	{
		if (this.member_id === "") {
			return;
		}

		await this.group.sentc.inviteAuto(this.member_id);
	}

	private async encrypt()
	{
		if (this.text === "") {
			return;
		}

		this.encrypted_text = await this.group.sentc.encryptString(this.text);
	}

	private async decrypt()
	{
		if (this.encrypted_text === "") {
			return;
		}

		this.decrypted_text = await this.group.sentc.decryptString(this.encrypted_text);
	}
}
</script>

<style scoped>

</style>