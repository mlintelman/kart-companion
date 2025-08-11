import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

const tracks = [
    "Mario Bros. Circuit",
    "Crown City",
    "Whistletop Summit",
    "DK Spaceport"
]

app.get("/random-track", (req, res) => {
    const track = tracks[Math.floor(Math.random() * tracks.length)]
    res.json({ track })
})

app.listen(5000, () => console.log("API running on http://localhost:5000"))