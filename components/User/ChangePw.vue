<template>
	<v-form @submit.prevent="changePassword">
		<v-card>
			<v-card-title>
				<h1 class="display-1">Change password</h1>
			</v-card-title>

			<v-card-text>
				<v-text-field
					v-model="old_password"
					required
					label="Old password"
					:type="showPassword ? 'text' : 'password'"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>

				<br>

				<v-text-field
					v-model="password"
					required
					label="New password"
					:type="showPassword ? 'text' : 'password'"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>

				<v-text-field
					v-model="password_2"
					required
					label="Confirm password"
					:type="showPassword ? 'text' : 'password'"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-card-text>

			<v-divider />
			<v-card-actions>
				<v-spacer />
				<v-btn color="success" type="submit">Change password</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Getter} from "nuxt-property-decorator";
import {User} from "@sentclose/sentc";

@Component
export default class ChangePw extends Vue
{
	private old_password = "";
	private password = "";
	private password_2 = "";

	private showPassword = false;

	@Getter("user/User/getUser")
	private getUser: User;

	private async changePassword()
	{
		if (this.old_password === "" || this.password === "" || this.password_2 !== this.password) {
			return;
		}

		const user = this.getUser;

		if (!user) {
			//not logged in
			return;
		}

		await user.changePassword(this.old_password, this.password);

		this.$emit("changeDone", true);
	}
}
</script>

<style scoped>

</style>