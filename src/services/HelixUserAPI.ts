import HelixService from "./HelixService";
const LOGIN = "/api/login";

export default class HelixUserAPI {
	helixService: HelixService = new HelixService();

	public async login(login: string, password: string, callback: () => void): Promise<any> {
		return this.helixService.post(
			LOGIN,
			JSON.stringify({ login: login, password: password }),
			callback
		);
	}

	public async refresh(token: string, callback: () => void): Promise<any> {
		return this.helixService.put(
			LOGIN,
			JSON.stringify({ refresh_token: token }),
			callback
		);
	}
}
