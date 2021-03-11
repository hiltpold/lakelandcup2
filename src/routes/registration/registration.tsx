import preact, { FunctionalComponent, h, JSX } from "preact";
import {useState, useEffect, useReducer} from "preact/hooks";
import style from "./style.module.css";

type State = {
  user: string;
  password: string;
  passwordConfirmation: string;
}


type Action = { type: "SET_FORM",  payload: {name: string, value: string}}

const formReducer = (state: State, action: Action ) => {
    console.log(state, action);
    return {
      ...state,
      [action.payload.name]: action.payload.value
    }
}

const Registration: FunctionalComponent = () => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [arePasswordsEqual, setArePasswordsEqual] = useState<boolean>(false);
    const [formData, setFormData] = useReducer(formReducer, {user:"", password:"", passwordConfirmation:""});
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleChange = ({currentTarget}: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        setFormData({
            type: "SET_FORM",
            payload: {name: currentTarget.name, value: currentTarget.value}
        });
    }

    const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
        event.preventDefault();
        console.log("SUBMIT");
        setSubmitting(true);
        console.log(event);
        setTimeout(() => {
          setSubmitting(false);
        }, 3000)
    }

    useEffect(() => {
        console.log("<LOGIN>");
        // handle session
    }, [password, passwordConfirmation]);

    return (
        <div className={`container `}>
            <div className="columns">
                <div className={`column col-3 col-mx-auto col-xs-12 col-lg-6 ${style.login}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className={`form-label ${style.label}`}>
                                Email
                            </label>
                            <label className="form-label"> 
                                <input className="form-input lakelandcup-input-form" name="user" type="text" placeholder="email" onChange={handleChange} />
                            </label>
                            <label className={`form-label ${style.label}`}>
                                Password
                            </label>
                            <label className="form-label"> 
                                <input className="form-input lakelandcup-input-form" name="password" type="password" placeholder="password" onChange={handleChange} />
                            <label className="form-label"> 
                                <input className="form-input lakelandcup-input-form" name="passwordConfirmation" type="password" placeholder="confirm password" onChange={handleChange} />
                            </label>
                            </label>
                            <label className="form-label"> 
                                <button className="btn">
                                    Register
                                </button>
                            </label>
                        </div>
                    </form>
                    <div>
                    <div>
                        You are submitting the following:
                        <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                        ))}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Registration;