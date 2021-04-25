import decode from "jwt-decode";
import HelixUserApi from "./HelixUserAPI";
import { IUser, IAuthenticateData, IAccessToken } from "../index";

export default class HelixAuth {
	helixUserAPI: HelixUserApi = new HelixUserApi();

	authenticate(login: string, password: string): Promise<IUser | undefined> {
		console.log("authenticate");
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

	saveUserToStorage(authenticate_data: IAuthenticateData): IUser | undefined {
		this.saveItem("access-token", authenticate_data.access_token);
		this.saveItem("refresh-token", authenticate_data.refresh_token);

		const extractedUser: IUser | undefined = this.loadUserFromStorage();
		this.saveItem("user", JSON.stringify(extractedUser));

		return extractedUser;
	}

	loadUserFromStorage(): IUser | undefined {
		var extractedUser: IUser | undefined = undefined;
		const rawAccessToken: string | null = sessionStorage.getItem(
			"access-token"
		);

		if (rawAccessToken !== undefined) {
			const accessToken: IAccessToken = decode<IAccessToken>(rawAccessToken!);
			extractedUser = {
				name: accessToken.user,
				user_uuid: accessToken.user_uuid,
				person_uuid: accessToken.person_uuid,
			};
		}

		return extractedUser;
	}

	signout(): void {
		sessionStorage.removeItem("access-token");
		sessionStorage.removeItem("refresh-token");
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
