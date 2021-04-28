interface IAuthenticateData {
	access_token: string;
	refresh_token: string;
}

interface IAccessToken {
	exp: number;
	user: string;
	user_uuid: string;
	person_uuid: string;
}

interface IRefreshToken {
	exp: number;
}

interface IUser {
	name: string;
	user_uuid: string;
	person_uuid: string;
}

interface IAuthContextProps {
	user?: IUser;
	isAuthenticated: boolean;
	authenticate: (credentials: ICredentials) => void;
	logout: () => void;
}

interface ICredentials {
	login: string;
	password: string;
}

export {
	IAccessToken,
	IRefreshToken,
	IAuthenticateData,
	IUser,
	ICredentials,
	IAuthContextProps,
};

export * from "./components/auth/AuthHook";

export { default as AuthProvider } from "./components/auth/AuthProvider";
export * from "./components/auth/AuthProvider";

export { default as AuthContext } from "./components/auth/AuthContext";
export * from "./components/auth/AuthContext";

export { default as PrivateRoute } from "./components/router/PrivateRoute";
export * from "./components/router/PrivateRoute";

export { default as HelixAuth } from "./services/HelixAuth";
export * from "./services/HelixAuth";

export { default as HelixService } from "./services/HelixService";
export * from "./services/HelixService";

export { default as HelixUserAPI } from "./services/HelixUserAPI";
export * from "./services/HelixUserAPI";
