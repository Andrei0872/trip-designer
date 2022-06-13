import "./LoginRegister.scss"
function Register() {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="logreg__form__register">
            <label className="logreg__form__register__label" htmlFor="register_email">Email</label>
            <input className="logreg__form__register__input" type="text" id="register_email"/>
            <label className="logreg__form__register__label" htmlFor="register_password">Password</label>
            <input className="logreg__form__register__input" type="password" id="register_password"/>
            <label className="logreg__form__register__label" htmlFor="register_repeat_password">Repeat password</label>
            <input className="logreg__form__register__input" type="password" id="register_repeat_password"/>
            <input className="logreg__form__register__button" type="submit" value="Continue"/>
        </form>
    )
}

export default Register