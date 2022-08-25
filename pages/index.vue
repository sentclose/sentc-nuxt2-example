<template>
	<v-row justify="center" align="center">
		<v-col cols="12" sm="8" md="6">
			<v-card class="logo py-4 d-flex justify-center">
				<SentcLogo />
			</v-card>
			<v-card>
				<v-card-title class="headline">
					Welcome to the demo of sentc for nuxt
				</v-card-title>
				<v-card-text>
					<p>We are using nuxt 2 with vuetify and the newest version of sentc.</p>

					<p>
						Sentc is a encryption sdk which provides end-to-end encryption, user identity and authentication
						and much more out of the box with a few lines of code.

						State of the art encryption and best practice user management.
					</p>

					<p>
						Create a new user account on sign up btn in the right corner or login with a user account.

						When you are logged in you can create and manage groups, or invite more user to your group.

						Have fun to explore our features.
					</p>

					<v-divider class="mb-3" />

					<p>
						For more information on Sentc, check out the <a
							href="https://sentclose.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							website
						</a>.
					</p>

					<p>
						Find a bug on this example? Report it on the gitlab
						<a
							href="https://gitlab.com/sentclose/sentc/sdk-examples/nuxt2/-/issues"
							target="_blank"
							rel="noopener noreferrer"
							title="contribute"
						>
							issue board
						</a>.
					</p>

					<p>
						Find a bug on sentc? Report it on the main gitlab
						<a
							href="https://gitlab.com/sentclose/sentc/sdk-implementations/sentc-javascript/-/issues"
							target="_blank"
							rel="noopener noreferrer"
							title="contribute"
						>
							issue board
						</a>.
					</p>

					<p>Thank you for using sentc and We are looking forward to bringing more exciting features in the future.</p>
					<div class="text-xs-right">
						<em><small>&mdash; Jörn Heinemann and Richard Dietz</small></em>
					</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import SentcLogo from "@/components/SentcLogo";
export default {
	name: "IndexPage",
	// eslint-disable-next-line @typescript-eslint/naming-convention
	components: {SentcLogo}
};
</script>
