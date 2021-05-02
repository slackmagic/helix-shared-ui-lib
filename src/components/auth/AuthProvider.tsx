import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { IUser, ICredentials } from "../../index";
import HelixAuth from "../../services/HelixAuth";
const REFRESH_TIMEOUT: number = 10 * 60 * 1000;

type Props = {
	children?: JSX.Element | JSX.Element[];
};

export default function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<undefined | IUser>(undefined);
	const helixAuth = new HelixAuth();

	useEffect(() => {
		loadUserFromStorage();
	}, []);

	useEffect(() => {
		const loadUser: IUser | undefined = helixAuth.loadUserFromStorage();

		const handle = setInterval(async () => {
			if (loadUser !== undefined) {
				helixAuth
					.refresh(loadUser.refresh_token)
					.then((user: IUser | undefined) => {
						if (user !== undefined) {
							setUser(user);
						}
					});
			}
		}, REFRESH_TIMEOUT);
		return () => clearInterval(handle);
	}, []);

	const loadUserFromStorage = () => {
		const loadUser: IUser | undefined = helixAuth.loadUserFromStorage();
		if (loadUser !== undefined) {
			setUser(loadUser);
		}
	};

	const authenticate = async (credentials: ICredentials) => {
		helixAuth
			.authenticate(credentials.login, credentials.password)
			.then((retrievedUser: IUser | undefined) => {
				if (retrievedUser !== undefined) {
					setUser(retrievedUser);
				}
			});
	};

	const logout = () => {
		helixAuth.signout();
		setUser(undefined);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				authenticate: authenticate,
				logout: logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
