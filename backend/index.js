import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

const app = express()
const port = process.env.PORT || 5000

// Define allowed origins for dev and prod
const devOrigins = ['http://localhost:5173']
const prodOrigins = ['https://kart-companion-ebon.vercel.app']

// Pick origins based on NODE_ENV
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins.concat(prodOrigins)

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true) // allow non-browser requests like curl or Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS policy does not allow access from origin ${origin}`), false)
    }
    return callback(null, true)
  },
  credentials: true
}))

app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Get all users
app.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database query failed' })
    }
    res.json(data)
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Post a vs race with participants
app.post('/vs_race', async (req, res) => {
    try {
        const { numRaces, participants} = req.body

        if (!numRaces || !participants || participants.length === 0) {
            return res.status(400).json({ error: "Number of races and participants are required."})
        }

        // Insert race data
        const {data: raceData, error: raceError} = await supabase
            .from('vs_race')
            .insert([{num_races: numRaces}])
            .select()
            .single()

        if (raceError) {
            console.error("Error inserting race:", raceError)
            return res.status(500).json({ error: "Failed to insert race" })
        }

        const raceId = raceData.vs_race_id

        // Now insert each participant and their placement
        const participantRows = Object.values(participants).map((p) => ({
            vs_race_id: raceId,
            user_id: p.userId,
            place: p.place,
        }));


        const { error: participantError } = await supabase
            .from('vs_race_participant')
            .insert(participantRows)

        if (participantError) {
            console.error("Error inserting race participant", participantError)
            return res.status(500).json({ error: "Failed to insert race participant"})
        }

        res.status(201).json({
            message: 'VS race created successfully',
            race: raceData,
            participants: participantRows
        })
    } catch (err) {
        console.error('Server error: ', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
