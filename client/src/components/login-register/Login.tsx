import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import { useAxios } from "../../context/useAxios";
import { useUserAuth } from "../../context/userAuthContext";
import "./LoginRegister.scss"

function Login(props: {onUserLogin?: (arg:any) => void}) {
    const { setUser } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElement = e.target as HTMLFormElement;
        loginUser(new FormData(formElement))
            .then(u => {
                setUser(u);
                props.onUserLogin?.(u);
                navigate("my-trips");
            });
    }

    return (
        <form onSubmit={handleSubmit} className="logreg__form__login">
            <label className="logreg__form__login__label" htmlFor="login_email">Email</label>
            <input className="logreg__form__login__input" name="email" type="text" id="login_email"/>
            <label className="logreg__form__login__label" htmlFor="login_password">Password</label>
            <input className="logreg__form__login__input" name="password" type="password" id="login_password"/>
            <input className="logreg__form__login__button" type="submit" value="Continue"/>
        </form>
    )
}

export default Login