import { createMuiTheme } from "@material-ui/core";

/*
main : 252b3d
main lighter: 404868
*/

const mainTheme = createMuiTheme({
	palette: {
		common: { black: "#000", white: "#fff" },
		background: {
			/*
			https://material.io/design/material-studies/rally.html#color
			*/
			//appbar: "#27272f",
			//sidebar: "#424250",
			paper: "#424250"
		},
		primary: {
			//GREEN
			light: "#37efba",
			main: "#000000",
			dark: "#045d56",
			contrastText: "#fff"
		},
		secondary: {
			//BLUE
			light: "#4dabf5",
			main: "#000000",
			dark: "#1769aa",
			contrastText: "#fff"
		},
		error: {
			light: "#e57373",
			main: "#f44336",
			dark: "#d32f2f",
			contrastText: "#fff"
		},
		text: {
			primary: "#000",
			secondary: "rgba(0, 0, 0, 0.54)",
			disabled: "rgba(0, 0, 0, 0.38)",
			hint: "rgba(0, 0, 0, 0.38)"
		}
	},
	typography: {
		//fontStyle: "regular",
		fontFamily: ["Roboto Condensed", "Roboto", "Roboto Slab"].join(",")
	}
});
export default mainTheme;
