var API_ACCESS_TOKEN: string = "1234567890-ABCDEFGH";

export default class HelixService {
	get(url: string, callback: () => void) {
		return fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-api-key": API_ACCESS_TOKEN,
			},
		})
			.then(this.validateResponse)
			.then((data) => {
				return data.json();
			})
			.catch((error) => {
				console.log(error);
				throw new Error(this.errorGenerator(error));
			})
			.finally(callback);
	}

	getWithAuth(url: string, token: string, callback: () => void) {
		return fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-api-key": API_ACCESS_TOKEN,
				Authorization: "Bearer " + token,
			},
		})
			.then(this.validateResponse)
			.then((data) => {
				return data.json();
			})
			.catch((error) => {
				console.log(error);
				throw new Error(this.errorGenerator(error));
			})
			.finally(callback);
	}

	post(url: string, json: string, callback: () => void): Promise<any> {
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_ACCESS_TOKEN,
			},
			body: json,
		})
			.then(this.validateResponse)
			.then((data) => {
				return data.json();
			})
			.catch((error) => {
				console.log(error);
				throw new Error(this.errorGenerator(error));
			})
			.finally(callback);
	}

	postWithAuth(url: string, token: string, json: string, callback: () => void) {
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_ACCESS_TOKEN,
				Authorization: "Bearer " + token,
			},
			body: json,
		})
			.then(this.validateResponse)
			.then((data) => {
				return data.json();
			})
			.catch((error) => {
				console.log(error);
				throw new Error(this.errorGenerator(error));
			})
			.finally(callback);
	}

	put(url: string, json: string, callback: () => void) {
		return fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_ACCESS_TOKEN,
			},
			body: json,
		})
			.then(this.validateResponse)
			.then((data) => {
				return data.json();
			})
			.catch((error) => {
				console.log(error);
				throw new Error(this.errorGenerator(error));
			})
			.finally(callback);
	}

	putWithAuth(url: string, token: string, json: string, callback: () => void) {
		return fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_ACCESS_TOKEN,
				Authorization: "Bearer " + token,
			},
			body: json,
		})
			.then(this.validateResponse)
			.then((data) => {
				return data.json();
			})
			.catch((error) => {
				console.log(error);
				throw new Error(this.errorGenerator(error));
			})
			.finally(callback);
	}

	deleteWithAuth(url: string, token: string, callback: () => void) {
		return (
			fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": API_ACCESS_TOKEN,
					Authorization: "Bearer " + token,
				},
			})
				//No JSON extraction on DELETE route.
				.then(this.validateResponse)
				.then((data) => {
					return data;
				})
				.catch((error) => {
					console.log(error);
					throw new Error(this.errorGenerator(error));
				})
				.finally(callback)
		);
	}

	validateResponse(response: any) {
		if (response.ok) {
			return response;
		} else {
			throw Error(response.statusText);
		}
	}

	errorGenerator(error: Error) {
		return "[HELIX Error]: " + error.message;
	}
}
