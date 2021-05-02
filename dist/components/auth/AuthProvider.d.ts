/// <reference types="react" />
declare type Props = {
    children?: JSX.Element | JSX.Element[];
    login_url?: string;
};
export default function AuthProvider({ children, login_url }: Props): JSX.Element;
export {};
