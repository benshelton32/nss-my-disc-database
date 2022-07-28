import { Outlet, Route, Routes } from "react-router-dom"
import { BagList } from "../discs/BagList"
import { DiscForm } from "../discs/DiscForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/myBag" element={ <BagList /> } />
            <Route path="addDisc" element={ <DiscForm /> } />
        </Routes>
    )
}