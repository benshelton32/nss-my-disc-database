import { useEffect, useState } from "react"
import "./BagList.css"

export const BagList = () => {

    const [discs, setDiscs] = useState([])
    const [usersDiscs, setUsersDiscs] = useState([])
    const [manufacturers, setManufacturers] = useState([])

    const localDiscUser = localStorage.getItem("disc_user")
    const discUserObject = JSON.parse(localDiscUser)

    useEffect(
        () => {
            fetch("http://localhost:8088/ownedDiscs?_expand=disc&_expand=user")
            .then(response => response.json())
            .then((discArray) => {
                setDiscs(discArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/manufacturers")
            .then(response => response.json())
            .then((manufacturerArray) => {
                setManufacturers(manufacturerArray)
            })
        },
        []
    )

    useEffect(
        () => {
            const myDiscs = discs.filter(disc => disc.user.id === discUserObject.id)
            setUsersDiscs(myDiscs)
        },
        [discs]
    )

    return <>

        <h1>{discUserObject.firstName}'s Bag</h1>

        <article className="discs">        

        {
            usersDiscs.map(userDisc => {
                return <>                        
                    <section className="disc" key={`disc--${userDisc.id}`}>
                        <header className="discManufacturerAndName">
                            <div className="discName">
                                {userDisc.disc.name}
                            </div>
                            <div className="discManufacturer">
                                {manufacturers.length > 0 && `Manufacturer:
                                    ${manufacturers.find(manufacturer => userDisc.disc.manufacturerId === manufacturer.id).name}
                                `}
                            </div>
                            <div className="discWeight">
                               {userDisc.weight} g 
                            </div>
                        </header>
                        <footer className="discWeightAndFlightCharacteristics">
                            {/* <div className="discWeight">
                               {userDisc.weight} g 
                            </div> */}
                            {/* <div className="discFlightCharacteristics">
                            Speed: {Math.round(userDisc.disc.speed)} | Glide: {Math.round(userDisc.disc.glide)} | Turn: {Math.round(userDisc.disc.turn)} | Fade: {Math.round(userDisc.disc.fade)}
                            </div> */}
                            <section className="discFlightCharacteristics">
                                <div className="individualDiscFlightCharacteristics">Speed: {Math.round(userDisc.disc.speed)}</div>
                                <div className="individualDiscFlightCharacteristics">Glide: {Math.round(userDisc.disc.glide)}</div>
                                <div className="individualDiscFlightCharacteristics">Turn: {Math.round(userDisc.disc.turn)}</div>
                                <div className="individualDiscFlightCharacteristics">Fade: {Math.round(userDisc.disc.fade)}</div>
                            </section>
                        </footer>
                    </section>
                </>
            })
        }
        </article>
    </>
}