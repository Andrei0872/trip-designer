import "./LoginRegister.scss"
function Login() {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="logreg__form__login">
            <label className="logreg__form__login__label">Email<input type="text"/></label>
            <label className="logreg__form__login__label">Password<input type="password"/></label>
            <input type="submit" value="continue"/>
        </form>
    )
}

export default Login