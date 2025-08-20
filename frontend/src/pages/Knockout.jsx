import React, { useState, useEffect } from "react";
import { rallies } from "../data/data";
import PlayerSelect from "../components/PlayerSelect";

export default function Knockout() {
    const [rallyId, setRallyId] = useState(1)
    const [numPlayers, setNumPlayers] = useState(1)
    const [players, setPlayers] = useState({})

    async function handleLogKO() {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await fetch(`${apiUrl}/ko`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    rallyId,
                    participants: players,
                }),
            })
            if (!response.ok) {
                throw new Error(`Failed to log KO Tour: ${response.status}`)
            }
            alert("KO Tour logged successfully!")

        } catch (error) {
            console.error("Error logging KO Tour:", error)
            alert("Failed to log KO Tour.")
        }
    }

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
            <p className="text-2xl font-semibold">Knockout Tour Logger</p>
            <hr className="mb-4 w-full" />

            {/* Form for entering the number of races */}
            <div className="flex flex-col space-y-2 mb-6">
                <label className="text-xl">Knockout Tour:{" "}
                    <select className='text-lg border-black border-2 cursor-pointer rounded-md' value={rallyId} onChange={e => setRallyId(e.target.value)}>
                        {rallies.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name}
                            </option>
                        ))}
                    </select> 
                </label>
                <label className="text-xl">Number of Players:{" "}
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

            <div className="flex flex-col items-center space-y-4">
                

                {/* Display the player selection & results */}
                <div>
                    <PlayerSelect numPlayers={parseInt(numPlayers) || 0} players={players} setPlayers={setPlayers}/>
                </div>

                {/* Buttons */}
                <button
                    onClick={() => handleLogKO()}
                    className="text-xl bg-green-600 text-white cursor-pointer rounded-md pl-2 pr-2 pt-1 pb-1"
                >
                    Log GP
                </button>
            </div>
        </div>
    );
}
