<template>
	<v-form @submit.prevent="login">
		<v-card max-width="500">
			<v-card-title>
				<h1 class="display-1">Login</h1>
			</v-card-title>

			<v-card-text>
				<v-text-field v-model="username" label="Username" prepend-icon="mdi-account-circle" />

				<v-text-field
					v-model="password"
					label="Password"
					:type="showPassword ? 'text' : 'password'"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn color="success" type="submit">Login</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Sentc, {User} from "@sentclose/sentc";
import {Mutation} from "nuxt-property-decorator";

@Component
export default class Login extends Vue
{
	private username = "";

	private password = "";

	private showPassword = false;

	@Mutation("user/User/setUser")
	private setUser: (user: User) => void;

	@Mutation("user/User/setLoginStatus")
	private setLoginStatus: (status: boolean) => void;

	public async login()
	{
		if (!this.username || !this.password) {
			console.error("Not the right data");
		}

		const user = await Sentc.login(this.username, this.password);

		this.setUser(user);
		this.setLoginStatus(true);
	}
}
</script>

<style scoped>

</style>