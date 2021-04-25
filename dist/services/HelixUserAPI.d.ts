import HelixService from "./HelixService";
export default class HelixUserAPI {
    helixService: HelixService;
    login(login: string, password: string, callback: () => void): Promise<any>;
}
