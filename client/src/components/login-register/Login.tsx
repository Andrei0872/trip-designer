import "./LoginRegister.scss"
function Login() {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="logreg__form__login">
            <label className="logreg__form__login__label" htmlFor="login_email">Email</label>
            <input className="logreg__form__login__input" type="text" id="login_email"/>
            <label className="logreg__form__login__label" htmlFor="login_password">Password</label>
            <input className="logreg__form__login__input" type="password" id="login_password"/>
            <input className="logreg__form__login__button" type="submit" value="Continue"/>
        </form>
    )
}

export default Login