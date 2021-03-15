import { h, render } from 'preact';
import './style/index.css';
import App from './components/app';
import { Auth0Provider } from "@auth0/auth0-react";
import config from "../config/auth0";
import LoginButton from "./components/authbuttons/loginbutton";

const node = document.getElementById('root') as Element;

render(
    <Auth0Provider
      domain={config.AUTH0_DOMAIN}
      clientId={config.AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
        <App/>
    </Auth0Provider>,
    document.body
);
