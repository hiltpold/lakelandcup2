import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Hero from "./hero/hero";
import Navbar from "./navbar/navbar";
//import Login from "../routes/login/login";
//import Registration from "../routes/signup/registration";
import League from "../routes/league";

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Hero/>
            <Navbar/>
            <Router>
                <League path="/league" />
            </Router>
        </div>
    );
};
export default App;