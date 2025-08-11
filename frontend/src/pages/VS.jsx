import React, { useState, useEffect } from "react";
import { locations } from "../data/data";

export default function VS() {
    const [numRaces, setNumRaces] = useState("");
    const [randomizedLocations, setRandomizedLocations] = useState([])

    function randomizeLocations(arr, n) {
        const shuffledLocations = [...arr]

        // Use the fisher-yates shuffle
        for (let i = shuffledLocations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledLocations[i], shuffledLocations[j]] = [shuffledLocations[j], shuffledLocations[i]]
        }
        return setRandomizedLocations(shuffledLocations.slice(0,n))
    }

    function handleSubmit(e) {
        e.preventDefault(); // prevent page refresh
        console.log("Number of races:", numRaces);
        randomizeLocations(locations, numRaces)
    }

    useEffect(() => {
        console.log("randomized: ", randomizedLocations)
    }, [randomizedLocations])
    
    return (
        <div className="justify-center font-medium text-gray-800 border-gray-800">
            <p className="text-2xl font-semibold">VS Race Randomizer</p>
            <hr className="mb-4" />

            {/* Form for entering the number of races */}
            <form onSubmit={handleSubmit}>
                <label className="text-xl">
                    Enter the number of races:{" "}
                    <input
                        id="numRacesInput"
                        type="tel"
                        value={numRaces}
                        onChange={(e) => setNumRaces(e.target.value)}
                        className="text-xl rounded-sm border-2 max-w-10"
                    />
                </label>
                <br />
                <button
                    type="submit"
                    className="text-xl bg-blue-500 text-white rounded-md pl-2 pr-2 pt-1 pb-1 mt-2"
                >
                    Submit
                </button>
            </form>
            <hr className="mt-4 mb-4" />

            {/* Display the races for the user */}
            <div className="block">
                {randomizedLocations.map((location, index) => (
                    <p key={index} className="text-lg font-medium">
                        Race {index + 1}: {location.name}
                    </p>
                ))}
            </div>

            {/* VS Race results */}
            <div>
                
            </div>
        </div>
    );
}
