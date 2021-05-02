import HelixService from "./HelixService";
export default class HelixUserAPI {
    helixService: HelixService;
    host?: string;
    constructor(host?: string);
    login(login: string, password: string, callback: () => void): Promise<any>;
    refresh(token: string, callback: () => void): Promise<any>;
}
