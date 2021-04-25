/// <reference types="react" />
import { RouteProps } from "react-router";
interface PrivateRouteProps extends RouteProps {
    component: any;
}
declare const PrivateRoute: (props: PrivateRouteProps) => JSX.Element;
export default PrivateRoute;
