<template>
	<v-form @submit.prevent="deleteUser">
		<v-card>
			<v-card-title>
				<h1 class="display-1">Delete user</h1>
			</v-card-title>

			<v-card-text>
				<v-text-field
					v-model="password"
					required
					label="Password"
					:type="showPassword ? 'text' : 'password'"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-card-text>

			<v-divider />
			<v-card-actions>
				<v-spacer />
				<v-btn color="error" type="submit">Delete</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Getter, Mutation} from "nuxt-property-decorator";
import {User} from "@sentclose/sentc";

@Component
export default class Delete extends Vue
{
	private password = "";

	private showPassword = false;

	@Getter("user/User/getUser")
	private getUser: User;

	@Mutation("user/User/setLoginStatus")
	private setLoginStatus: (status: boolean) => void;
	
	private async deleteUser()
	{
		const user = this.getUser;

		if (!user) {
			//not logged in
			return;
		}

		await user.deleteUser(this.password);

		this.$emit("changeDone", true);

		this.setLoginStatus(false);

		return this.$router.push("/");
	}
}
</script>

<style scoped>

</style>