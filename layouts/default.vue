<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			:clipped-left="clipped"
			fixed
			app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-btn
				icon
				@click.stop="miniVariant = !miniVariant"
			>
				<v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
			</v-btn>

			<v-toolbar-title v-text="title" />
			<v-spacer />

			<v-toolbar-items>
				<client-only>
					<v-btn v-if="!is_logged_in" text @click="loginDialog = true"><v-icon small left>mdi-login</v-icon> Sign In</v-btn>
					<v-btn v-if="!is_logged_in" text @click="registerDialog = true"><v-icon small left>mdi-account-plus</v-icon>Sign Up</v-btn>

					<v-btn v-if="is_logged_in" icon @click.stop="right_drawer = !right_drawer"><v-icon>mdi-menu</v-icon></v-btn>
				</client-only>
			</v-toolbar-items>
		</v-app-bar>

		<v-main>
			<v-dialog v-model="loginDialog" max-width="500">
				<Login @loginDone="loginDialog = false" />
			</v-dialog>

			<v-dialog v-model="registerDialog" max-width="500">
				<Register @registerDone="registerDialog = false" />
			</v-dialog>

			<v-dialog v-model="changePwDialog" max-width="500">
				<ChangePw @changeDone="changePwDialog = false" />
			</v-dialog>

			<v-dialog v-model="resetPasswordDialog" max-width="500">
				<ResetPw @changeDone="resetPasswordDialog = false" />
			</v-dialog>

			<v-dialog v-model="userDeleteDialog" max-width="500">
				<Delete @changeDone="userDeleteDialog = false" />
			</v-dialog>

			<v-container>
				<Nuxt />
			</v-container>
		</v-main>

		<v-navigation-drawer v-model="right_drawer" right temporary fixed>
			<v-list>
				<v-list-item @click="changePwDialog = true">
					<v-list-item-action>
						<v-icon>mdi-account</v-icon>
					</v-list-item-action>
					<v-list-item-title>Change password</v-list-item-title>
				</v-list-item>

				<v-list-item @click="resetPasswordDialog = true">
					<v-list-item-action>
						<v-icon>mdi-account</v-icon>
					</v-list-item-action>
					<v-list-item-title>Reset password</v-list-item-title>
				</v-list-item>

				<v-list-item @click="userDeleteDialog = true">
					<v-list-item-action>
						<v-icon>mdi-account</v-icon>
					</v-list-item-action>
					<v-list-item-title>Delete</v-list-item-title>
				</v-list-item>

				<v-list-item @click="logOut()">
					<v-list-item-action>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-action>
					<v-list-item-title>Logout</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-footer
			:absolute="!fixed"
			app
		>
			<span>&copy; Sentclose {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Getter, Mutation} from "nuxt-property-decorator";
import Login from "~/components/User/Login.vue";
import Register from "~/components/User/Register.vue";
import ChangePw from "~/components/User/ChangePw.vue";
import ResetPw from "~/components/User/ResetPw.vue";
import Delete from "~/components/User/Delete.vue";
import {User} from "@sentclose/sentc";

@Component({
	name: "DefaultLayout",
	// eslint-disable-next-line @typescript-eslint/naming-convention
	components: {Delete, ResetPw, ChangePw, Register, Login}
})
export default class extends Vue
{
	private clipped = true;
	private drawer = false;
	private right_drawer = false;
	private fixed = false;

	private items = [
		{
			icon: "mdi-apps",
			title: "Home",
			to: "/"
		},
		{
			icon: "mdi-chart-bubble",
			title: "Create group",
			to: "/group"
		}
	];

	private miniVariant = false;
	private title = "Sentc Nuxt";

	@Getter("user/User/getLoggedIn")
	private is_logged_in: boolean | undefined;

	@Getter("user/User/getUser")
	private getUser: User;

	@Mutation("user/User/setLoginStatus")
	private setLoginStatus: (status: boolean) => void;

	private loginDialog = false;
	private registerDialog = false;
	private changePwDialog = false;
	private resetPasswordDialog = false;
	private userDeleteDialog = false;

	private async logOut()
	{
		const user = this.getUser;

		if (!user) {
			//not logged in
			return;
		}

		await user.logOut();

		this.setLoginStatus(false);
	}
}
</script>
