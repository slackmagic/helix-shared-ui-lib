import HelixService from "./HelixService";
const LOGIN = "/api/login";

export default class HelixUserAPI {
	helixService: HelixService = new HelixService();
	host?: string;

	constructor(host?: string) {
		this.host = host !== undefined ? host : "";
	}

	public async login(
		login: string,
		password: string,
		callback: () => void
	): Promise<any> {
		return this.helixService.post(
			this.host + LOGIN,
			JSON.stringify({ login: login, password: password }),
			callback
		);
	}

	public async refresh(token: string, callback: () => void): Promise<any> {
		return this.helixService.put(
			this.host + LOGIN,
			JSON.stringify({ refresh_token: token }),
			callback
		);
	}
}
