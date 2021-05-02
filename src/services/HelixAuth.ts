import decode from "jwt-decode";
import HelixUserApi from "./HelixUserAPI";
import { IUser, IAuthenticateData, IAccessToken } from "../index";

export default class HelixAuth {
	helixUserAPI: HelixUserApi = new HelixUserApi();

	authenticate(login: string, password: string): Promise<IUser | undefined> {
		return this.helixUserAPI
			.login(login, password, () => {})
			.then((authenticate_data: IAuthenticateData) => {
				return this.saveUserToStorage(authenticate_data);
			})
			.catch(() => undefined)
			.finally(() => {
				setTimeout(() => {}, 500);
			});
	}

	refresh(token: string): Promise<IUser | undefined> {
		return this.helixUserAPI
			.refresh(token, () => {})
			.then((authenticate_data: IAuthenticateData) => {
				return this.saveUserToStorage(authenticate_data);
			})
			.catch(() => undefined)
			.finally(() => {
				setTimeout(() => {}, 500);
			});
	}

	saveUserToStorage(authenticate_data: IAuthenticateData): IUser | undefined {
		var extractedUser: IUser | undefined = undefined;
		const accessToken: IAccessToken = decode<IAccessToken>(
			authenticate_data.access_token
		);

		extractedUser = {
			name: accessToken.user,
			user_uuid: accessToken.user_uuid,
			person_uuid: accessToken.person_uuid,
			access_token: authenticate_data.access_token,
			refresh_token: authenticate_data.refresh_token,
			exp: new Date(accessToken.exp*1000),
			iat: new Date(accessToken.iat*1000),
		};

		this.saveItem("user", JSON.stringify(extractedUser));

		return extractedUser;
	}

	loadUserFromStorage(): IUser | undefined {
		const rawUser: string | null = sessionStorage.getItem("user");
		var extractedUser: IUser | undefined =
			rawUser !== null ? JSON.parse(rawUser) : undefined;

		return extractedUser;
	}

	signout(): void {
		sessionStorage.removeItem("user");
	}

	async saveItem(key: string, value: any) {
		try {
			await sessionStorage.setItem(key, value);
		} catch (error) {
			console.error("sessionStorage error: " + error.message);
		}
	}
}
