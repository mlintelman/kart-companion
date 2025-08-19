import React, { useState, useEffect } from "react";
import { locations } from "../data/data";
import PlayerSelect from "../components/PlayerSelect";

export default function VS() {
    const [numRaces, setNumRaces] = useState(4)
    const [numPlayers, setNumPlayers] = useState(1)
    const [randomizedLocations, setRandomizedLocations] = useState([])
    const [players, setPlayers] = useState({})

    function randomizeLocations() {
        const shuffledLocations = [...locations]

        for (let i = shuffledLocations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledLocations[i], shuffledLocations[j]] = [shuffledLocations[j], shuffledLocations[i]]
        }
        return setRandomizedLocations(shuffledLocations)
    }

    async function handleLogVSRace() {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await fetch(`${apiUrl}/vs_race`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    numRaces,
                    participants: players,
                }),
            })
            if (!response.ok) {
                throw new Error(`Failed to log VS race: ${response.status}`)
            }
            alert("VS race logged successfully!")

        } catch (error) {
            console.error("Error logging VS race:", error)
            alert("Failed to log VS race.")
        }
    }

    useEffect(() => {
        randomizeLocations()
    }, [])

    useEffect(() => {
        setPlayers((prev) => {
            const trimmed = {}
            for (let i = 1; i <= numPlayers; i++) {
                if (prev[i]) {
                    trimmed[i] = prev[i]
                }
            }
            return trimmed
        })
    }, [numPlayers])
    
    return (
        <div className="flex flex-col items-center font-medium text-gray-800 border-gray-800">
            <p className="text-2xl font-semibold">VS Race Randomizer</p>
            <hr className="mb-4 w-full" />

            {/* Form for entering the number of races */}
            <div className="flex flex-col space-y-2 mb-6">
                <label className="text-xl">Select Number of races:{" "}
                    <select className='text-lg border-black border-2 cursor-pointer rounded-md' value={numRaces} onChange={e => setNumRaces(e.target.value)}>
                        {Array.from({ length:30 }, (_, i) => i + 3).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select> 
                </label>
                <label className="text-xl">Select Number of Players:{" "}
                    <select className='text-lg border-black border-2 cursor-pointer rounded-md' value={numPlayers} onChange={e => setNumPlayers(e.target.value)}>
                        {Array.from({ length:4 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select> 
                </label>
            </div>

            <hr className="mb-4 w-full" />

            <div className="flex flex-col space-y-4">
                {/* Display the races for the user */}
                <div className="text-xl space-y-1">
                    {randomizedLocations.slice(0,numRaces).map((location, index) => (
                        <p key={index}>
                            Race {index + 1}: {location.name}
                        </p>
                    ))}
                </div>

                {/* Display the player selection & results */}
                <div>
                    <PlayerSelect numPlayers={parseInt(numPlayers) || 0} players={players} setPlayers={setPlayers}/>
                </div>

                {/* Buttons */}
                <div className="space-x-2">
                    <button
                        onClick={() => randomizeLocations()}
                        className="text-xl bg-blue-500 text-white cursor-pointer rounded-md pl-2 pr-2 pt-1 pb-1"
                    >
                        Reroll Races
                    </button>
                    <button
                        onClick={() => handleLogVSRace()}
                        className="text-xl bg-green-600 text-white cursor-pointer rounded-md pl-2 pr-2 pt-1 pb-1"
                    >
                        Log VS Race
                    </button>
                </div>
            </div>
        </div>
    );
}
