/**
 * @author Jörn Heinemann <joernheinemann@gmx.de>
 * @since 2022/08/20
 */
import {Module, VuexModule, Mutation, Action} from "vuex-module-decorators";
import {Sentc, User as SentcUser} from "@sentclose/sentc";

@Module({
	stateFactory: true
})
export default class User extends VuexModule
{
	//@ts-ignore
	private user: SentcUser = "";

	private logged_in = false;

	private init = false;

	get getLoggedIn() {
		return this.logged_in;
	}

	get getUser() {
		return this.user;
	}

	get isInit() {
		return this.init;
	}

	@Mutation
	public setInit(init:boolean)
	{
		this.init = init;
	}

	@Mutation
	public setUser(user: SentcUser)
	{
		this.user = user;
	}

	@Mutation
	public setLoginStatus(status: boolean)
	{
		this.logged_in = status;
	}

	@Action({rawError: true})
	public async initUser()
	{
		if (this.init) {
			return;
		}

		const user = await Sentc.init({
			// @ts-ignore -> env must be set
			app_token: process.env.NUXT_ENV_APP_PUBLIC_TOKEN,
			base_url: process.env.NUXT_ENV_BASE_URL,
			wasm_path: "/sentc_wasm_bg.wasm"
		});

		this.context.commit("setInit", true);

		if (!user) {
			this.context.commit("setLoginStatus", false);
			return;
		}

		this.context.commit("setLoginStatus", true);
		this.context.commit("setUser", user);
	}
}