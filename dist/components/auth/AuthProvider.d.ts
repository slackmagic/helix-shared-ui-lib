/// <reference types="react" />
declare type Props = {
    children?: JSX.Element | JSX.Element[];
    login_url?: string;
    refresh_timeout?: number;
};
export default function AuthProvider({ children, login_url, refresh_timeout, }: Props): JSX.Element;
export {};
