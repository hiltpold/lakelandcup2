import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Hero from "./hero";
import Navbar from "./navbar";
import League from "../routes/league";
import Prospects from "../routes/prospects";
import Home from "../routes/home";
import NotFound from "../routes/notfound";
import ProtectedRoute from "../auth";

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Hero/>
            <Navbar/>
            <Router>
                <Home path="/" />
                <ProtectedRoute path="/league" children={League} />
                <NotFound default />
            </Router>
        </div>
    );
};
export default App;