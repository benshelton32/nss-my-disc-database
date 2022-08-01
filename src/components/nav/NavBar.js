import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

// invoked on MyDiscDatabase.js
export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <section className="navbar">
            <div className="navbar__item navbar-left">
                <button className="addDiscButton" onClick={() => navigate("/addDisc")}>Add Disc</button>
            </div>
            <div className="navbar_brand"><img className="logo" src={process.env.PUBLIC_URL+"/myDiscDatabaseLogo.png"} /></div>
            <div className="navbar-right">
                <div className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="/myBag"><img className="navbar_icon" src={process.env.PUBLIC_URL+"/MDDbbag.png"}/><p className="navbar_icon_text">My Bag</p></Link>
                </div>

                {
                    localStorage.getItem("disc_user")
                        ? <div className="navbar__item navbar__logout">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("disc_user")
                                navigate("/", {replace: true})
                            }}><img className="navbar_icon" src={process.env.PUBLIC_URL+"/MDDbbasket.png"}/><p className="navbar_icon_text">Logout</p></Link>
                        </div>
                        : ""
                }
            </div>
        </section>
    )
}