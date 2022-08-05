import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./DiscForm.css"

// invoked on ApplicationViews.js
export const DiscForm = () => {
    // set initial state for disc and define function update to change it
    const [disc, update] = useState({
        manufacturerId: "",
        discId: "",
        weight: "",
        discColor: "#f890e7",
        stampColor: "#000000"
    })

    const [manufacturers, setManufacturers] = useState([])
    const [discOptions, setDiscOptions] = useState([])
    const [discsFilteredByManufacturer, setFilteredDiscs] = useState([])
    const [plastics, setPlastics] = useState([])
    const [plasticsFilteredByManufacturer, setFilteredPlastics] = useState([])

    const navigate = useNavigate()

    const localDiscUser = localStorage.getItem("disc_user")
    const discUserObject = JSON.parse(localDiscUser)

    // useEffect to fetch manufacturers data from JSON and set state for manufacturers
    useEffect(
        () => {
            fetch("http://localhost:8088/manufacturers")
            .then(response => response.json())
            .then(manufacturerArray => {
                setManufacturers(manufacturerArray)
            })
        },
        []
    )

    // useEffect to fetch discs data from JSON and set state for discOptions
    useEffect(
        () => {
            fetch("http://localhost:8088/discs")
            .then(response => response.json())
            .then (discArray => {
                setDiscOptions(discArray)
            })
        },
        []
    )
    
    // useEffect to set state of discsFilteredByManufacturer
    // used if conditional state to only run if the manufacturerId on the disc object is a value other than zero or a blank string
    // if conditions are met then discOptions is filtered to only return objects whose manufacturerId is equal to the disc object's manufacturerId
    // used parseInt to change value from stribg to integer for conditional statement
    useEffect(
        () => {
            if (disc.manufacturerId !== 0 && disc.manufacturerId !== "" ) {
                const filteredDiscs = discOptions.filter(discOption => discOption.manufacturerId === parseInt(disc.manufacturerId))
                // used .sort to list disc names in alphabetical order
                filteredDiscs.sort((firstDisc, secondDisc) => {
                    if (firstDisc.name < secondDisc.name) {
                    return -1;
                    }
                    if (firstDisc.name > secondDisc.name) {
                        return 1;
                    }
                    return 0;})
                setFilteredDiscs(filteredDiscs)
            }
        },
        [disc] //useEffect is only triggered if there is a change to the disc variable
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

    // useEffect to set state of plasticFilteredByManufacturer
    // used if conditional state to only run if the manufacturerId on the disc object is a value other than zero or a blank string
    // if conditions are met then discOptions is filtered to only return objects whose manufacturerId is equal to the disc object's manufacturerId
    // used parseInt to change value from stribg to integer for conditional statement
    useEffect(
        () => {
            if (disc.manufacturerId !== 0 && disc.manufacturerId !== "" ) {
                const filteredPlastics = plastics.filter(plastic => plastic.manufacturerId === parseInt(disc.manufacturerId))
                setFilteredPlastics(filteredPlastics)
            }
        },
        [disc] //useEffect is only triggered if there is a change to the disc variable
    )

    // function for what happens on Add Disc button click
    const handleAddDiscButtonClick = (event) => {
        event.preventDefault()

        // define object with properities and values to be sent and saved in the JSON database
        // used parseInt() to convert string values to intergers
        const discToSendToAPI = {
            userId: discUserObject.id,
            discId: parseInt(disc.discId),
            plasticId: parseInt(disc.plasticId),
            weight: parseInt(disc.weight),
            discColor: disc.discColor,
            stampColor: disc.stampColor
        }

        // fetch call to post the previosly defined object variable to the JSON database as an OwnedDisc
        // used .then() to navigate user back to BagList or /myBag as well
        return fetch("http://localhost:8088/ownedDiscs", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(discToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/myBag")
            })
        }
    
    return (
        <article className="discFormContainer">
            <form className="discForm">
                <h2 className="discForm__title">Add a New Disc</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer: </label>
                        <select
                            value={disc.maufacturerId}
                            required autoFocus
                            className="form-control"
                            id="discFormControl"
                            onChange={
                                (event) => {
                                    const copy = {...disc}
                                    copy.manufacturerId = event.target.value
                                    update(copy)
                                }
                            }>
                                <option value="">Select manufacturer...</option>
                                {
                                    manufacturers.map(manufacturer => {
                                        return <>
                                            <option key={`manufacturer--${manufacturer.id}`} value={manufacturer.id}>{manufacturer.name}</option>
                                        </>
                                    })
                                }
                        </select>
                    </div>
                </fieldset>
                {/* used conditional to only display field if the disc object's manufacturerId is not zero or an empty array, meaning it should only display once a manufacturer is selected */}
                {disc.manufacturerId !== 0 && disc.manufacturerId !== "" && <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Model: </label>
                        <select
                            value={disc.discId}
                            required
                            className="form-control"
                            id="discFormControl"
                            onChange={
                                (event) => {
                                    const copy = {...disc}
                                    copy.discId = event.target.value
                                    update(copy)
                                }
                            }>
                                <option value="">Select disc...</option>
                                {
                                discsFilteredByManufacturer.map(discFilteredByManufacturer => {
                                                return  <>
                                                    <option key={`disc--${discFilteredByManufacturer.id}`} value={discFilteredByManufacturer.id}>{discFilteredByManufacturer.name}</option>
                                                </>
                                                })
                                }
                        </select>
                    </div>
                </fieldset>}
                {/* used conditional to only display field if the disc object's manufacturerId is not zero or an empty array, meaning it should only display once a manufacturer is selected */}
                {disc.manufacturerId !== 0 && disc.manufacturerId !== "" && <fieldset>
                    <div className="form-group">
                        <label htmlFor="plastic">Plastic: </label>
                        <select
                            value={disc.plasticId}
                            required
                            className="form-control"
                            id="discFormControl"
                            onChange={
                                (event) => {
                                    const copy = {...disc}
                                    copy.plasticId = event.target.value
                                    update(copy)
                                }
                            }>
                                <option value="">Select plastic...</option>
                                {
                                plasticsFilteredByManufacturer.map(plasticFilteredByManufacturer => {
                                                return  <>
                                                    <option key={`plastic--${plasticFilteredByManufacturer.id}`} value={plasticFilteredByManufacturer.id}>{plasticFilteredByManufacturer.name}</option>
                                                </>
                                                })
                                }
                        </select>
                    </div>
                </fieldset>}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="weight">Weight(g):</label>
                        <input
                            required
                            type="number"
                            className="form-control"
                            id="discFormControl"
                            placeholder="Enter disc weight.."
                            value={disc.weight}
                            onChange={
                                (event) => {
                                    const copy = {...disc}
                                    copy.weight = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="discColor"> Disc Color:</label>
                        <input
                            required
                            type="color"
                            className="form-control"
                            id="discFormControl"
                            placeholder="Choose disc color.."
                            value={disc.discColor}
                            onChange={
                                (event) => {
                                    const copy = {...disc}
                                    copy.discColor = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="discColor"> Stamp or Secondary Color:</label>
                        <input
                            required
                            type="color"
                            className="form-control"
                            id="discFormControl"
                            placeholder="Choose disc color.."
                            value={disc.stampColor}
                            onChange={
                                (event) => {
                                    const copy = {...disc}
                                    copy.stampColor = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <div className="buttonRow">
                <button
                    onClick={(clickEvent) => handleAddDiscButtonClick(clickEvent)}
                    className="btn btn-info">
                    Add Disc
                </button>
                {/* added a second button 'Cancel' that navigates back to /myBag (BagList) in cases user doesn't want to add a new disc once accessing the form */}
                <button
                    onClick={() => navigate("/mybag")}
                    className="btn btn-secondary">
                Cancel</button>
                </div>
            </form>
        </article>
    )
}