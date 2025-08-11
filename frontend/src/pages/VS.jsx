import React, { useState, useEffect } from "react";
import { locations } from "../data/data";

export default function VS() {

    return (
        <div className="justify-center">
            <p className="text-2xl font-semibold">VS Race Randomizer</p>
            <hr className="mb-4"></hr>
            <label className="text-xl">Enter the number of races: </label>
            <input id="numRacesInput" type="tel" className="text-xl rounded-sm border-2 max-w-10"/>
        </div>
    )
}