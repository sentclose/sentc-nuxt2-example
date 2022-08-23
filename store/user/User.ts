/**
 * @author Jörn Heinemann <joernheinemann@gmx.de>
 * @since 2022/08/20
 */
import {Module, VuexModule, Mutation} from "vuex-module-decorators";
import {User as SentcUser} from "@sentclose/sentc";

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
}