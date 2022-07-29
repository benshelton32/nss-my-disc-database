import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./DiscForm.css"


export const DiscForm = () => {
    const [disc, update] = useState({
        manufacturerId: "",
        discId: "",
        weight: ""
    })

    const [manufacturers, setManufacturers] = useState([])
    const [discOptions, setDiscOptions] = useState([])
    const [discsFilteredByManufacturer, setFilteredDiscs] = useState([])

    const navigate = useNavigate()

    const localDiscUser = localStorage.getItem("disc_user")
    const discUserObject = JSON.parse(localDiscUser)

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

    useEffect(
        () => {
            if (disc.manufacturerId !== 0 && disc.manufacturerId !== "" ) {
                const filteredDiscs = discOptions.filter(discOption => discOption.manufacturerId === parseInt(disc.manufacturerId))
                setFilteredDiscs(filteredDiscs)
            }
        },
        [disc]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        const discToSendToAPI = {
            userId: discUserObject.id,
            // manufacturerId: parseInt(disc.manufacturerID),
            discId: parseInt(disc.discId),
            weight: parseInt(disc.weight)
        }

        // TODO: Perform the fetch() to POST the object to the API

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
        <form className="discForm">
            <h2 className="discForm__title">Add a New Disc</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer: </label>
                    <select
                        value={disc.maufacturerId}
                        required autoFocus
                        className="form-control"
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
            {disc.manufacturerId !== 0 && disc.manufacturerId !== "" && <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Model: </label>
                    <select
                        value={disc.discId}
                        required
                        className="form-control"
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="weight">Weight(g):</label>
                    <input
                        required
                        type="number"
                        className="form-control"
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
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Disc
            </button>
            <button
                onClick={() => navigate("/mybag")}
                className="btn btn-secondary">
            Cancel</button>
        </form>
    )
}