import { FunctionalComponent, h } from 'preact';
import { useAuth0 } from "@auth0/auth0-react";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../components/loading";

const League: FunctionalComponent = () =>   {
    const { user } = useAuth0();
    return (
        <div>
            {JSON.stringify(user, null, 2)}
        </div>
    );
}
//export default League;
export default withAuthenticationRequired(League, {
    onRedirecting: () => <Loading />,
  });