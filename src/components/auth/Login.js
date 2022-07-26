import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

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
                    localStorage.setItem("disc_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/myBag")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>My Disc Database</h1>
                    <h2>Please log in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Please enter your email.."
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Login
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <div>Need an account?</div>
                <Link to="/register">Sign up here</Link>
            </section>
        </main>
    )
}

