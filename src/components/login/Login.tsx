import React, { useState, useEffect } from "react";
import mainTheme from "../theme/MainTheme";
import { Button, TextField } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { useAuth } from "../auth/AuthHook"


const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(14, 0, 6),
		color: "white",
		backgroundColor: "#121212",
	},
	mainHeader: {
		padding: theme.spacing(5, 0, 5),
		color: "white",
		backgroundColor: "#121212",
		maxWidth: "100%",
	},
	mainTitle: {
		fontFamily: "Share Tech Mono",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(5),
	},

	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Login() {
	const { authenticate } = useAuth();
	const classes = useStyles();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	useEffect(() => {
		setIsButtonDisabled(
			login.trim().length === 0 || password.trim().length === 0
		);
	}, [login, password]);

	const handleLogin = () => {
		authenticate({ login, password });
	};

	const handleKeyPress = (e: React.KeyboardEvent<any>) => {
		if (e.keyCode === 13 || e.which === 13) {
			isButtonDisabled || handleLogin();
		}
	};

	return (
		<>
			<ThemeProvider theme={mainTheme}>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="login"
						label="Login"
						name="login"
						autoComplete="login"
						autoFocus
						onChange={(e) => setLogin(e.target.value)}
						onKeyPress={(e) => handleKeyPress(e)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Mot de passe"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
						onKeyPress={(e) => handleKeyPress(e)}
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={isButtonDisabled}
						onClick={() => handleLogin()}
					>
						Se connecter
					</Button>
				</form>
			</ThemeProvider>
		</>
	);
}

export default Login;
