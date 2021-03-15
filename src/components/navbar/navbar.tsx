import { FunctionalComponent, h } from "preact";
import style from "./style.module.css";
import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton, LogoutButton} from "../authbuttons";

const Navbar: FunctionalComponent= () => {
    const { loginWithRedirect } = useAuth0();
    const { logout, isAuthenticated } = useAuth0();

    return(
        <header className={`navbar ${style.navbar}`}>
            <section className="navbar-section" />
            <section className="navbar-center">
                <a className="btn btn-link text-dark" href="/league"> League </a>
                {
                    !isAuthenticated && < LoginButton />
                }
                {
                    isAuthenticated && < LogoutButton />
                }
            </section>
            <section className="navbar-section" />
        </header>
    );
};
export default Navbar;