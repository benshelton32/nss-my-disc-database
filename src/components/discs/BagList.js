import { useEffect, useState } from "react"
import "./BagList.css"

// invoked on ApplicationViews.js
export const BagList = () => {

    // useState is a hook that stores the state in a component
    const [discs, setDiscs] = useState([])
    const [usersDiscs, setUsersDiscs] = useState([])
    const [manufacturers, setManufacturers] = useState([])
    const [plastics, setPlastics] = useState([])
    const [distanceDrivers, setDistanceDrivers] = useState([])
    const [fairwayDrivers, setFairwayDrivers] = useState([])
    const [midRangeDiscs, setMidRangeDiscs] = useState([])
    const [putters, setPutters] = useState([])

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

    // useEffect to fetch plastics data from JSON and set state for plastics
    useEffect(
        () => {
            fetch("http://localhost:8088/plastics")
            .then(response => response.json())
            .then((plasticArray) => {
                setPlastics(plasticArray)
            })
        },
        [] //empty array means it is observing initial component state
    )

    // useEffect that takes the userDiscs array previously defined and filters to only return the discs that have the discTypeId of 1 which is for Distance Drivers
    useEffect(
        () => {
            const myDistanceDrivers = usersDiscs.filter(userDisc => userDisc.disc.discTypeId === 1)
            setDistanceDrivers(myDistanceDrivers)
        },
        [usersDiscs] // this useEffect is only triggered when there is a change in the usersDiscs array previously defined
    )

    // useEffect that takes the userDiscs array previously defined and filters to only return the discs that have the discTypeId of 2 which is for Fairway Drivers
    useEffect(
        () => {
            const myFairwayDrivers = usersDiscs.filter(userDisc => userDisc.disc.discTypeId === 2)
            setFairwayDrivers(myFairwayDrivers)
        },
        [usersDiscs] // this useEffect is only triggered when there is a change in the usersDiscs array previously defined
    )

    // useEffect that takes the userDiscs array previously defined and filters to only return the discs that have the discTypeId of 3 which is for Mid-Range
    useEffect(
        () => {
            const myMidRangeDiscs = usersDiscs.filter(userDisc => userDisc.disc.discTypeId === 3)
            setMidRangeDiscs(myMidRangeDiscs)
        },
        [usersDiscs] // this useEffect is only triggered when there is a change in the usersDiscs array previously defined
    )

    // useEffect that takes the userDiscs array previously defined and filters to only return the discs that have the discTypeId of 4 which is for Putt & Approach
    useEffect(
        () => {
            const myPutters = usersDiscs.filter(userDisc => userDisc.disc.discTypeId === 4)
            setPutters(myPutters)
        },
        [usersDiscs] // this useEffect is only triggered when there is a change in the usersDiscs array previously defined
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

        <article className="sortedDiscs">

        {/* used conditional to only display the code if there are discs in the distanceDrivers array */}
        {distanceDrivers.length > 0 && <>
        <h2 className="discTypeHeading">Distance Drivers</h2>  
            
            <article className="discs">      

                {/* used .map to iterate through the distanceDrivers array to display the discs that the currently logged in user owns and are categorized as distance drivers */}
                {
                    distanceDrivers.map(distanceDriver => {
                        return <>                        
                            <section className="disc" key={`disc--${distanceDriver.id}`}>
                                <aside className="discColorSection">
                                    <div className="discRepresentation">
                                        {/* used empty spans and inline styling to give visual representation of the disc with they disc color and stamp(or secondary, if not stamped) color */}
                                        <span className="discColor" style={{backgroundColor: `${distanceDriver.discColor}`} }>
                                            <span className="stampColor"style={{borderColor: `${distanceDriver.stampColor}`} }></span>
                                        </span>
                                    </div>
                                    <div className="discPlastic">
                                            {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                            <div className="plasticHeading">Plastic:</div>
                                            {plastics.length > 0 && 
                                                <div className="plasticName">{plastics.find(plastic => distanceDriver.plasticId === plastic.id).name}
                                            </div>}
                                    </div>
                                </aside>
                                <section className="discInformation">
                                    <header className="discManufacturerWeightAndNameConatiner">
                                        <div className="discManufacturerAndName">
                                            <div className="discName">
                                                {distanceDriver.disc.name}
                                            </div>
                                            <div className="discManufacturer">
                                                {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                                {manufacturers.length > 0 && `Manufacturer:
                                                    ${manufacturers.find(manufacturer => distanceDriver.disc.manufacturerId === manufacturer.id).name}
                                                `}
                                            </div>
                                        </div>
                                        <div className="discWeightContainer">
                                            <div className="discWeight">
                                            {distanceDriver.weight} g 
                                            </div>
                                        </div>
                                    </header>
                                    
                                    <section className="discFlightCharacteristics">
                                        {/* used Math.round() to round to nearest integer */}
                                        <div className="individualDiscFlightCharacteristics">Speed: {Math.round(distanceDriver.disc.speed)}</div>
                                        <div className="individualDiscFlightCharacteristics">Glide: {Math.round(distanceDriver.disc.glide)}</div>
                                        <div className="individualDiscFlightCharacteristics">Turn: {Math.round(distanceDriver.disc.turn)}</div>
                                        <div className="individualDiscFlightCharacteristics">Fade: {Math.round(distanceDriver.disc.fade)}</div>
                                    </section>

                                    {/* when clicking the button, a fetch call occurs to delete the entry in the ownedDiscs array that matches the selected discs id 
                                    used .then() to invoke the previously defined function to run a new fetch call and cause the useEffect that sets userDiscs to trigger*/}
                                    <footer className="deleteButton">
                                        <button onClick={() => {
                                                fetch(`http://localhost:8088/ownedDiscs/${distanceDriver.id}`, {
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
                            </section>
                        </>
                    })
                }
            </article>
            </>}

            {/* used conditional to only display the code if there are discs in the fairwayDrivers array */}
            {fairwayDrivers.length > 0 && <>
                <h2 className="discTypeHeading">Fairway Drivers</h2>
                
                <article className="discs">        

                {/* used .map to iterate through the fairwayDrivers array to display the discs that the currently logged in user owns and are categorized as fairway drivers */}
                {
                    fairwayDrivers.map(fairwayDriver => {
                        return <>                        
                            <section className="disc" key={`disc--${fairwayDriver.id}`}>
                                <aside className="discColorSection">
                                    <div className="discRepresentation">
                                        {/* used empty spans and inline styling to give visual representation of the disc with they disc color and stamp(or secondary, if not stamped) color */}
                                        <span className="discColor" style={{backgroundColor: `${fairwayDriver.discColor}`} }>
                                            <span className="stampColor"style={{borderColor: `${fairwayDriver.stampColor}`} }></span>
                                        </span>
                                    </div>
                                    <div className="discPlastic">
                                            {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                            <div className="plasticHeading">Plastic:</div>
                                            {plastics.length > 0 && 
                                                <div className="plasticName">{plastics.find(plastic => fairwayDriver.plasticId === plastic.id).name}
                                            </div>}
                                    </div>
                                </aside>
                                <section className="discInformation">
                                    <header className="discManufacturerWeightAndNameConatiner">
                                        <div className="discManufacturerAndName">
                                            <div className="discName">
                                                {fairwayDriver.disc.name}
                                            </div>
                                            <div className="discManufacturer">
                                                {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                                {manufacturers.length > 0 && `Manufacturer:
                                                    ${manufacturers.find(manufacturer => fairwayDriver.disc.manufacturerId === manufacturer.id).name}
                                                `}
                                            </div>
                                        </div>
                                        <div className="discWeightContainer">
                                            <div className="discWeight">
                                            {fairwayDriver.weight} g 
                                            </div>
                                        </div>
                                    </header>
                                    
                                    <section className="discFlightCharacteristics">
                                        {/* used Math.round() to round to nearest integer */}
                                        <div className="individualDiscFlightCharacteristics">Speed: {Math.round(fairwayDriver.disc.speed)}</div>
                                        <div className="individualDiscFlightCharacteristics">Glide: {Math.round(fairwayDriver.disc.glide)}</div>
                                        <div className="individualDiscFlightCharacteristics">Turn: {Math.round(fairwayDriver.disc.turn)}</div>
                                        <div className="individualDiscFlightCharacteristics">Fade: {Math.round(fairwayDriver.disc.fade)}</div>
                                    </section>

                                    {/* when clicking the button, a fetch call occurs to delete the entry in the ownedDiscs array that matches the selected discs id 
                                    used .then() to invoke the previously defined function to run a new fetch call and cause the useEffect that sets userDiscs to trigger*/}
                                    <footer className="deleteButton">
                                        <button onClick={() => {
                                                fetch(`http://localhost:8088/ownedDiscs/${fairwayDriver.id}`, {
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
                            </section>
                        </>
                    })
                }
            </article>
            </>}

            {/* used conditional to only display the code if there are discs in the midRangeDiscs array */}
            {midRangeDiscs.length > 0 && <>
            <h2 className="discTypeHeading">Mid-Range</h2> 

            <article className="discs">       

                {/* used .map to iterate through the midRangeDiscs array to display the discs that the currently logged in user owns and are categorized as mid-range discs */}
                {
                    midRangeDiscs.map(midRangeDisc => {
                        return <>                        
                            <section className="disc" key={`disc--${midRangeDisc.id}`}>
                                <aside className="discColorSection">
                                    <div className="discRepresentation">
                                        {/* used empty spans and inline styling to give visual representation of the disc with they disc color and stamp(or secondary, if not stamped) color */}
                                        <span className="discColor" style={{backgroundColor: `${midRangeDisc.discColor}`} }>
                                            <span className="stampColor"style={{borderColor: `${midRangeDisc.stampColor}`} }></span>
                                        </span>
                                    </div>
                                    <div className="discPlastic">
                                        {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                        <div className="plasticHeading">Plastic:</div>
                                            {plastics.length > 0 && 
                                               <div className="plasticName">{plastics.find(plastic => midRangeDisc.plasticId === plastic.id).name}
                                            </div>}
                                    </div>
                                </aside>
                                <section className="discInformation">
                                    <header className="discManufacturerWeightAndNameConatiner">
                                        <div className="discManufacturerAndName">
                                            <div className="discName">
                                                {midRangeDisc.disc.name}
                                            </div>
                                            <div className="discManufacturer">
                                                {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                                {manufacturers.length > 0 && `Manufacturer:
                                                    ${manufacturers.find(manufacturer => midRangeDisc.disc.manufacturerId === manufacturer.id).name}
                                                `}
                                            </div>
                                        </div>
                                        <div className="discWeightContainer">
                                            <div className="discWeight">
                                            {midRangeDisc.weight} g 
                                            </div>
                                        </div>
                                    </header>
                                    
                                    <section className="discFlightCharacteristics">
                                        {/* used Math.round() to round to nearest integer */}
                                        <div className="individualDiscFlightCharacteristics">Speed: {Math.round(midRangeDisc.disc.speed)}</div>
                                        <div className="individualDiscFlightCharacteristics">Glide: {Math.round(midRangeDisc.disc.glide)}</div>
                                        <div className="individualDiscFlightCharacteristics">Turn: {Math.round(midRangeDisc.disc.turn)}</div>
                                        <div className="individualDiscFlightCharacteristics">Fade: {Math.round(midRangeDisc.disc.fade)}</div>
                                    </section>

                                    {/* when clicking the button, a fetch call occurs to delete the entry in the ownedDiscs array that matches the selected discs id 
                                    used .then() to invoke the previously defined function to run a new fetch call and cause the useEffect that sets userDiscs to trigger*/}
                                    <footer className="deleteButton">
                                        <button onClick={() => {
                                                fetch(`http://localhost:8088/ownedDiscs/${midRangeDisc.id}`, {
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
                            </section>
                        </>
                    })
                }
            </article>
            </>}

            {/* used conditional to only display the code if there are discs in the putters array */}
            {putters.length > 0 && <>
            <h2 className="discTypeHeading">Putt & Approach</h2> 

            <article className="discs">        

                {/* used .map to iterate through the putters array to display the discs that the currently logged in user owns and are categorized as putt & approach discs */}
                {
                    putters.map(putter => {
                        return <>                        
                            <section className="disc" key={`disc--${putter.id}`}>
                                <aside className="discColorSection">
                                    <div className="discRepresentation">
                                        {/* used empty spans and inline styling to give visual representation of the disc with they disc color and stamp(or secondary, if not stamped) color */}
                                        <span className="discColor" style={{backgroundColor: `${putter.discColor}`} }>
                                            <span className="stampColor"style={{borderColor: `${putter.stampColor}`} }></span>
                                        </span>
                                    </div>
                                    <div className="discPlastic">
                                        {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                        <div className="plasticHeading">Plastic:</div>
                                            {plastics.length > 0 && 
                                               <div className="plasticName">{plastics.find(plastic => putter.plasticId === plastic.id).name}
                                            </div>}
                                    </div>
                                </aside>
                                <section className="discInformation">
                                    <header className="discManufacturerWeightAndNameConatiner">
                                        <div className="discManufacturerAndName">
                                            <div className="discName">
                                                {putter.disc.name}
                                            </div>
                                            <div className="discManufacturer">
                                                {/* used conditional so the code only displays after the manufacturers array has fetched the data instead of in its inital empty array state */}
                                                {manufacturers.length > 0 && `Manufacturer:
                                                    ${manufacturers.find(manufacturer => putter.disc.manufacturerId === manufacturer.id).name}
                                                `}
                                            </div>
                                        </div>
                                        <div className="discWeightContainer">
                                            <div className="discWeight">
                                            {putter.weight} g 
                                            </div>
                                        </div>
                                    </header>
                                    
                                    <section className="discFlightCharacteristics">
                                        {/* used Math.round() to round to nearest integer */}
                                        <div className="individualDiscFlightCharacteristics">Speed: {Math.round(putter.disc.speed)}</div>
                                        <div className="individualDiscFlightCharacteristics">Glide: {Math.round(putter.disc.glide)}</div>
                                        <div className="individualDiscFlightCharacteristics">Turn: {Math.round(putter.disc.turn)}</div>
                                        <div className="individualDiscFlightCharacteristics">Fade: {Math.round(putter.disc.fade)}</div>
                                    </section>

                                    {/* when clicking the button, a fetch call occurs to delete the entry in the ownedDiscs array that matches the selected discs id 
                                    used .then() to invoke the previously defined function to run a new fetch call and cause the useEffect that sets userDiscs to trigger*/}
                                    <footer className="deleteButton">
                                        <button onClick={() => {
                                                fetch(`http://localhost:8088/ownedDiscs/${putter.id}`, {
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
                            </section>
                        </>
                    })
                }
            </article>
            </>}
        </article>
    </>
}