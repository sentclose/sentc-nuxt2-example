<template>
	<v-form @submit.prevent="resetPassword">
		<v-card>
			<v-card-title>
				<h1 class="display-1">Reset password</h1>
			</v-card-title>

			<v-card-text>
				<v-text-field
					v-model="new_password"
					required
					label="New password"
					:type="showPassword ? 'text' : 'password'"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn color="error" type="submit">Reset password</v-btn>
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
export default class ResetPw extends Vue
{
	private new_password = "";

	private showPassword = false;

	@Getter("user/User/getUser")
	private getUser: User;

	private async resetPassword()
	{
		if (this.new_password === "") {
			return;
		}

		const user = this.getUser;

		if (!user) {
			//not logged in
			return;
		}

		await user.resetPassword(this.new_password);

		this.$emit("changeDone", true);
	}
}
</script>

<style scoped>

</style>