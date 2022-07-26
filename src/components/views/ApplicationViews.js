import { Outlet, Route, Routes } from "react-router-dom"
import { BagList } from "../discs/BagList"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/myBag" element={ <BagList /> } />
        </Routes>
    )
}