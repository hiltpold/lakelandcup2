import { h, render } from 'preact';
import './style/index.css';
import App from './components/app';
import { Auth0Provider } from "@auth0/auth0-react";
import config from "../config/auth0";
import LoginButton from "./components/authbuttons/loginbutton";

const node = document.getElementById('root') as Element;

render(<App/>, document.body);
