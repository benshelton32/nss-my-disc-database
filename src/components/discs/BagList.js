import { useEffect, useState } from "react"
import { Badge, Button } from "reactstrap"
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
            const myDiscs = discs.filter(disc => disc?.user?.id === discUserObject.id)
            myDiscs.sort((firstDisc, secondDisc) => {return secondDisc.disc.speed - firstDisc.disc.speed})
            setUsersDiscs(myDiscs)
        },
        [discs]
    )

    const getUsersDiscs = () => {
        fetch(`http://localhost:8088/ownedDiscs?_expand=disc&_expand=user&userId=${discUserObject.id}`)
            .then(response => response.json())
            .then((discArray) => {
                setDiscs(discArray)
            })
    }

    return <>

        <h1 className="userBagHeading">{discUserObject.firstName}'s Bag</h1>

        <article className="discs">        

        {
            usersDiscs.map(userDisc => {
                return <>                        
                    <section className="disc" key={`disc--${userDisc.id}`}>
                        <header className="discManufacturerWeightAndNameConatiner">
                            <div className="discManufacturerAndName">
                                <div className="discName">
                                    {userDisc.disc.name}
                                </div>
                                <div className="discManufacturer">
                                    {manufacturers.length > 0 && `Manufacturer:
                                        ${manufacturers.find(manufacturer => userDisc.disc.manufacturerId === manufacturer.id).name}
                                    `}
                                </div>
                            </div>
                            <div className="discWeightContainer">
                                <div className="discWeight">
                                {userDisc.weight} g 
                                </div>
                            </div>
                        </header>
                        
                        <section className="discFlightCharacteristics">
                            {/* <div className="discWeight">
                               {userDisc.weight} g 
                            </div> */}
                            {/* <div className="discFlightCharacteristics">
                            Speed: {Math.round(userDisc.disc.speed)} | Glide: {Math.round(userDisc.disc.glide)} | Turn: {Math.round(userDisc.disc.turn)} | Fade: {Math.round(userDisc.disc.fade)}
                            </div> */}
                            {/* <div className="discFlightCharacteristics"> */}
                                <div className="individualDiscFlightCharacteristics">Speed: {Math.round(userDisc.disc.speed)}</div>
                                <div className="individualDiscFlightCharacteristics">Glide: {Math.round(userDisc.disc.glide)}</div>
                                <div className="individualDiscFlightCharacteristics">Turn: {Math.round(userDisc.disc.turn)}</div>
                                <div className="individualDiscFlightCharacteristics">Fade: {Math.round(userDisc.disc.fade)}</div>
                            {/* </div> */}
                        </section>

                        <footer className="deleteButton">
                            <button onClick={() => {
                                    fetch(`http://localhost:8088/ownedDiscs/${userDisc.id}`, {
                                        method: "DELETE"
                                    })
                                    .then(() => {
                                        getUsersDiscs()
                                    })
                                    }} className="btn btn-secondary">
                                Delete
                            </button>
                        </footer>
                    </section>
                </>
            })
        }
        </article>
    </>
}