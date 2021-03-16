import { FunctionalComponent, h } from 'preact';
import { useAuth0 } from "@auth0/auth0-react";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../components/loading";

const League: FunctionalComponent = () =>   {
    const { user } = useAuth0();
    return (
        <div>
            <h1>
                In progress...
            </h1>
            {JSON.stringify(user)}
        </div>
    );
}
//export default League;
export default withAuthenticationRequired(League, {
    onRedirecting: () => <Loading />,
});