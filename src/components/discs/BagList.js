import { useEffect, useState } from "react"
import { Badge, Button } from "reactstrap"
import "./BagList.css"

// invoked on ApplicationViews.js
export const BagList = () => {

    // useState is a hook that stores the state in a component
    const [discs, setDiscs] = useState([])
    const [usersDiscs, setUsersDiscs] = useState([])
    const [manufacturers, setManufacturers] = useState([])

    // assign the properties and values stored in disc_user in the localStorage in browser to a variable, which includes id and firstName for the user logged in
    const localDiscUser = localStorage.getItem("disc_user")
    const discUserObject = JSON.parse(localDiscUser)

    // useEffect is a hook that observes state
    // useEffect to fetch owndedDiscs data from JSON and set state for discs
    useEffect(
        () => {
            fetch("http://localhost:8088/ownedDiscs?_expand=disc&_expand=user")
            .then(response => response.json())
            .then((discArray) => {
                setDiscs(discArray)
            })
        },
        [] //empty array means it is observing initial component state
    )

    // useEffect to fetch manufacturers data from JSON and set state for manufacturers
    useEffect(
        () => {
            fetch("http://localhost:8088/manufacturers")
            .then(response => response.json())
            .then((manufacturerArray) => {
                setManufacturers(manufacturerArray)
            })
        },
        [] //empty array means it is observing initial component state
    )

    // useEffect that takes the discs array previously defined and filters to only return the discs that the user who is logged in owns
    // .sort is used to sort the discs in descending speed in the array so they will mapped and displayed on the page later in that order 
    useEffect(
        () => {
            const myDiscs = discs.filter(disc => disc?.user?.id === discUserObject.id)
            myDiscs.sort((firstDisc, secondDisc) => {return secondDisc.disc.speed - firstDisc.disc.speed})
            setUsersDiscs(myDiscs)
        },
        [discs] // this useEffect is only triggered when there is a change in the discs array previously defined
    )

    // Defined a function to run a fetch call that only returns the objects in the ownedDiscs array that have the same userId as the currently logged in user and set the initial disc array with the returned data
    // This will be used in the delete function to trigger the useEffect previously defined to reset the state so the DOM reflects the deletion
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

        {/* used .map to iterate through the userDiscs array to display the discs that the currently logged in user owns */}
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
                                    {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
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
                            {/* used Math.round() to round to nearest integer */}
                            <div className="individualDiscFlightCharacteristics">Speed: {Math.round(userDisc.disc.speed)}</div>
                            <div className="individualDiscFlightCharacteristics">Glide: {Math.round(userDisc.disc.glide)}</div>
                            <div className="individualDiscFlightCharacteristics">Turn: {Math.round(userDisc.disc.turn)}</div>
                            <div className="individualDiscFlightCharacteristics">Fade: {Math.round(userDisc.disc.fade)}</div>
                        </section>

                        {/* when clicking the button, a fetch call occurs to delete the entry in the ownedDiscs array that matches the selected discs id 
                        used .then() to invoke the previously defined function to run a new fetch call and cause the useEffect that sets userDiscs to trigger*/}
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