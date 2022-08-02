import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "./Login.css"

// invoked on MyDiscDatabase.js
export const Register = (props) => {
    // changed properties to reflect ones needed for users
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    // changed to disc user and added firstName as object property
                    localStorage.setItem("disc_user", JSON.stringify({
                        id: createdUser.id,
                        firstName: createdUser.firstName                        
                    }))
                    // changed from "/" to "/myBag"
                    navigate("/myBag")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main className="container--login" style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <img className="loginLogo" src={process.env.PUBLIC_URL+"/myDiscDatabaseLogo.png"} />
                <h2>Registration</h2>
                {/* split fullName into firstName and LastName fields/properties */}
                <fieldset className="labelAndInputField">
                    <label className="inputLabel" htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                           type="text" id="firstName" className="form-control"
                           placeholder="Enter your first name.." required autoFocus />
                </fieldset>
                <fieldset className="labelAndInputField">
                    <label className="inputLabel" htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                           type="text" id="lastName" className="form-control"
                           placeholder="Enter your last name.." required autoFocus />
                </fieldset>
                <fieldset className="labelAndInputField">
                    <label className="inputLabel" htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Enter your email.." required />
                </fieldset>
                <fieldset className="buttonFieldSet">
                    <button className="button" type="submit"> Register </button>
                </fieldset>
            </form>
            <section>
                <div>Already have an account?</div>
                <Link className="hyperlink" to="/login">Log in here</Link>
            </section>
        </main>
    )
}

