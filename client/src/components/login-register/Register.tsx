import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/user";
import { useUserAuth } from "../../context/userAuthContext";
import "./LoginRegister.scss"

function Register() {
    const { setUser } = useUserAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElement = e.target as HTMLFormElement;
        registerUser(new FormData(formElement))
            .then(u => {
                setUser(u);
                navigate("my-trips");
            })
    }

    return (
        <form onSubmit={handleSubmit} className="logreg__form__register">
            <label className="logreg__form__register__label" htmlFor="register_email">Email</label>
            <input className="logreg__form__register__input" name="email" type="text" id="register_email"/>
            <label className="logreg__form__register__label" htmlFor="register_password">Password</label>
            <input className="logreg__form__register__input" name="password" type="password" id="register_password"/>
            <label className="logreg__form__register__label" htmlFor="register_repeat_password">Repeat password</label>
            <input className="logreg__form__register__input" type="password" id="register_repeat_password"/>
            <input className="logreg__form__register__button" type="submit" value="Continue"/>
        </form>
    )
}

export default Register