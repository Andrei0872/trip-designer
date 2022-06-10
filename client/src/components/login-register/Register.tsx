import "./LoginRegister.scss"
function Register() {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="logreg__form__register">
            <label className="logreg__form__register__label">Email<input type="text"/></label>
            <label className="logreg__form__register__label">Password<input type="password"/></label>
            <label className="logreg__form__register__label">Repeat password<input type="password"/></label>
            <input type="submit" value="continue"/>
        </form>
    )
}

export default Register