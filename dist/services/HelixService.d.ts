export default class HelixService {
    get(url: string, callback: () => void): Promise<any>;
    getWithAuth(url: string, token: string, callback: () => void): Promise<any>;
    post(url: string, json: string, callback: () => void): Promise<any>;
    postWithAuth(url: string, token: string, json: string, callback: () => void): Promise<any>;
    put(url: string, json: string, callback: () => void): Promise<any>;
    putWithAuth(url: string, token: string, json: string, callback: () => void): Promise<any>;
    deleteWithAuth(url: string, token: string, callback: () => void): Promise<any>;
    validateResponse(response: any): any;
    errorGenerator(error: Error): string;
}
