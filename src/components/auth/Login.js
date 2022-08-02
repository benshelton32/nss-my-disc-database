import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

// invoked on MyDiscDatabase.js
export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    // changed to disc_user and chose to use id and firstName properties
                    localStorage.setItem("disc_user", JSON.stringify({
                        id: user.id,
                        firstName: user.firstName
                    }))
                    // changed naviagte from "/"" to "/mybag" as this is what the user should see on log in
                    navigate("/myBag")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section className="form--container">
                <form className="form--login" onSubmit={handleLogin}>
                    <img className="loginLogo" src={process.env.PUBLIC_URL+"/myDiscDatabaseLogo.png"} />
                    <h2>Please log in</h2>
                    <fieldset className="labelAndInputField">
                        <label className="inputLabel" htmlFor="inputEmail"> Email </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Please enter your email.."
                            required autoFocus />
                    </fieldset>
                    <fieldset className="buttonFieldSet">
                        <button className="button" type="submit">
                            Login
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <div>Need an account?</div>
                <Link className="hyperlink" to="/register">Sign up here</Link>
            </section>
        </main>
    )
}

