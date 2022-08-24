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

			<v-toolbar-items v-if="!is_logged_in">
				<v-btn text @click="loginDialog = true"><v-icon small left>mdi-login</v-icon> Sign In</v-btn>
				<v-btn text @click="registerDialog = true"><v-icon small left>mdi-account-plus</v-icon>Sign Up</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-main>
			<v-dialog v-model="loginDialog" max-width="500">
				<Login @loginDone="loginDialog = false" />
			</v-dialog>

			<v-dialog v-model="registerDialog" max-width="500">
				<Register @registerDone="registerDialog = false" />
			</v-dialog>

			<v-container>
				<Nuxt />
			</v-container>
		</v-main>

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
import {Getter} from "nuxt-property-decorator";
import Login from "~/components/User/Login.vue";
import Register from "~/components/User/Register.vue";

@Component({
	name: "DefaultLayout",
	// eslint-disable-next-line @typescript-eslint/naming-convention
	components: {Register, Login}
})
export default class extends Vue
{
	private clipped = true;
	private drawer = false;
	private fixed = false;

	private items = [
		{
			icon: "mdi-apps",
			title: "Home",
			to: "/"
		},
		{
			icon: "mdi-chart-bubble",
			title: "Groups",
			to: "/group"
		}
	];

	private miniVariant = false;
	private title = "Sentc Nuxt";

	@Getter("user/User/getLoggedIn")
	private is_logged_in: boolean | undefined;

	private loginDialog = false;
	private registerDialog = false;
}
</script>
