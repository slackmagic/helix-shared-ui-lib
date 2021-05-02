import HelixUserApi from "./HelixUserAPI";
import { IUser, IAuthenticateData } from "../index";
export default class HelixAuth {
    helixUserAPI: HelixUserApi;
    authenticate(login: string, password: string): Promise<IUser | undefined>;
    refresh(token: string): Promise<IUser | undefined>;
    saveUserToStorage(authenticate_data: IAuthenticateData): IUser | undefined;
    loadUserFromStorage(): IUser | undefined;
    signout(): void;
    saveItem(key: string, value: any): Promise<void>;
}
