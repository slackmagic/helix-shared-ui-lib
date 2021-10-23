import React from "react";
import { IAuthContextProps } from "../../index";

const contextDefaultValues: IAuthContextProps = {
	user: undefined,
	isAuthenticated: false,
	authenticate: () => {},
	logout: async () => null,
};

const AuthContext =
	React.createContext<IAuthContextProps>(contextDefaultValues);

export default AuthContext;
