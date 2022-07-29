import { Navigate, useLocation } from "react-router-dom"

// invoked on MyDiscDatabase.js
export const Authorized = ({ children }) => {
    const location = useLocation()

    // if the user has disc_user in localStorage in the browser, meaning they are logged in, then they get access to the children elements on MyDiscDatabase.js
    if (localStorage.getItem("disc_user")) {
        return children
    }
    // if the user does not have disc_user, meaning they are not logged in, then they are taken to the log in screen
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}