<template>
	<div>
		<Login ref="login" style="display: none" />

		<v-form @submit.prevent="register">
			<v-card>
				<v-card-title>
					<h1 class="display-1">Register</h1>
				</v-card-title>

				<v-card-text>
					<v-text-field
						v-model.lazy="username"
						label="Username"
						prepend-icon="mdi-account-circle"
						:error-messages="[...usernameErrors]"
					/>

					<v-text-field
						v-model="password"
						label="Password"
						:type="showPassword ? 'text' : 'password'"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						loading
						@click:append="showPassword = !showPassword"
					>
						<template #progress>
							<v-progress-linear
								:color="score.color"
								:value="score.value"
								class="text-right"
								absolute
								height="7"
							/>
						</template>
					</v-text-field>

					<v-text-field
						v-model="password2"
						required
						label="Confirm password"
						:type="showPassword ? 'text' : 'password'"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					/>
				</v-card-text>

				<v-card-actions>
					<v-spacer />

					<v-btn color="success" type="submit">Register</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import zxcvbn from "zxcvbn";
import Sentc from "@sentclose/sentc";
import Login from "~/components/User/Login.vue";

//from https://stackoverflow.com/a/63118724/12177973
function debounce(fn, delay) {
	let timeoutID = null;
	return function() {
		clearTimeout(timeoutID);
		const args = arguments;
		const that = this;
		timeoutID = setTimeout(function() {
			fn.apply(that, args);
		}, delay);
	};
}

@Component({
	// eslint-disable-next-line @typescript-eslint/naming-convention
	components: {Login},
	watch: {
		/**
		 * Check if a username is available.
		 *
		 * check every sec when user was typing a username
		 */
		username: debounce(function() {
			if (this.isInputFunctionRunning) {
				return;
			}

			this.isInputFunctionRunning = true;
			this.usernameErrors = [];

			if (!this.username || this.username === "") {
				this.isInputFunctionRunning = false;
				return;
			}

			const p = Sentc.checkUserIdentifierAvailable(this.username);

			if (!p) {
				this.isInputFunctionRunning = false;
				return;
			}

			p.then((check) => {
				if (!check) {
					//
					this.usernameErrors.push("Username is not available please choose another one");
				}

				this.isInputFunctionRunning = false;
			}).catch((e) => {
				console.error(e);
				this.isInputFunctionRunning = false;
			});
		}, 1000)
	},
	computed: {
		score() {
			if (this.password.length < 6) {
				return {
					color: "red",
					value: 0
				};
			}

			const result = zxcvbn(this.password);

			switch (result.score) {
				case 0:
					return {
						color: "red",
						value: 10
					};
				case 1:
					return {
						color: "orange",
						value: 25
					};
				case 2:
					return {
						color: "yellow",
						value: 50
					};
				case 3:
					return {
						color: "light-green",
						value: 75
					};
				case 4:
					return {
						color: "light-blue",
						value: 100
					};
			}
		}
	}
})
export default class Register extends Vue
{
	private username = "";
	private password = "";
	private password2 = "";

	private usernameErrors = [];

	private showPassword = false;
	private isInputFunctionRunning = false;

	private async register()
	{
		if (this.username === "" || this.password === "") {
			console.error("Not the right input");
			return false;
		}

		if (this.password !== this.password2) {
			console.error("passwords are not the same");
			return false;
		}

		await Sentc.register(this.username, this.password);

		this.$emit("registerDone", true);

		//@ts-ignore
		return this.$refs.login.login(this.username, this.password);
	}
}
</script>

<style scoped>

</style>