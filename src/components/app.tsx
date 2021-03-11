import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Hero from "./hero/hero";
import Navbar from "./navbar/navbar";
import Login from "../routes/login/login";
import Registration from "../routes/registration/registration";

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Hero/>
            <Navbar/>
            <Router>
                <Login path="/login" />
                <Registration path="/registration" />
            </Router>
        </div>
    );
};
export default App;