import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { IUser, ICredentials } from "../../index";
import HelixAuth from "../../services/HelixAuth";

type Props = {
	children?: JSX.Element | JSX.Element[];
};

export default function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<undefined | IUser>(undefined);
	const [helixAuth] = useState<HelixAuth>(new HelixAuth());

	useEffect(() => {
		console.log(`__load: get user from storage`);
		loadUserFromStorage();
	}, []);

	useEffect(() => {
		const handle = setInterval(async () => {
			console.log(`__refresh: check user`);
			console.log(JSON.stringify(user));
			if (user !== undefined) {
				console.log(`__refresh: retrieve token`);
				helixAuth
					.refresh(user.refresh_token)
					.then((user: IUser | undefined) => {
						if (user !== undefined) {
							setUser(user);
						}
					});
			}
		}, 5 * 1000);
		return () => clearInterval(handle);
	}, []);

	const loadUserFromStorage = async () => {
		const user: IUser | undefined = helixAuth.loadUserFromStorage();
		if (user !== undefined) {
			setUser(user);
			console.log(`__load: user loaded`);
		}
	};

	const authenticate = async (credentials: ICredentials) => {
		helixAuth
			.authenticate(credentials.login, credentials.password)
			.then((user: IUser | undefined) => {
				if (user !== undefined) {
					setUser(user);
				}
			});
	};

	const logout = async () => {
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
