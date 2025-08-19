import React, { useState, useEffect } from "react";

export default function PlayerSelect({ numPlayers, players, setPlayers }) {
  const [options, setOptions] = useState([]);
  //const [players, setPlayers] = useState({}); // { 1: { name: "", place: "" }, 2: {...} }

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/users`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then((data) => setOptions(data))
      .catch((err) => console.error("error fetching options:", err))
  }, [])

  const handleNameChange = (playerIndex, value) => {
    setPlayers((prev) => ({
      ...prev,
      [playerIndex]: { ...prev[playerIndex], userId: value },
    }))
  }

  const handlePlaceChange = (playerIndex, value) => {
    setPlayers((prev) => ({
      ...prev,
      [playerIndex]: { ...prev[playerIndex], place: value },
    }))
  }

  return (
    <div className="text-xl flex flex-col">
      {Array.from({ length: numPlayers }, (_, i) => {
        const playerNum = i + 1;
        return (
          <div key={playerNum} className="mb-2">
            <label className="mr-1">Player {playerNum}:</label>

            {/* Name Select (note: user selects a username, but the value of the option tag which is sent to players dictionary is the user id) */}
            <select
              className="text-lg border-black cursor-pointer border-2 rounded-md mr-2"
              value={players[playerNum]?.userId || ""}
              onChange={(e) => handleNameChange(playerNum, e.target.value)}
            >
              <option className="text-gray-500" value="">
                Name
              </option>
              {options.map((opt) => (
                <option className="text-black" key={opt.id} value={opt.id}>
                  {opt.username}
                </option>
              ))}
            </select>

            {/* Place Select */}
            <select
              className="text-lg border-black cursor-pointer border-2 rounded-md"
              value={players[playerNum]?.place || ""}
              onChange={(e) => handlePlaceChange(playerNum, e.target.value)}
            >
              <option className="text-gray-500" value="" disabled>
                Place
              </option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
