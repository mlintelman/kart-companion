import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
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
            message: 'VS race inserted successfully',
            race: raceData,
            participants: participantRows
        })
    } catch (err) {
        console.error('Server error: ', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Post a grand prix with participants
app.post('/gp', async (req, res) => {
    try {
        const { cupId, participants} = req.body

        if (!cupId || !participants || participants.length === 0) {
            return res.status(400).json({ error: "Cup selection and players are required."})
        }

        // Insert race data
        const {data: gpData, error: gpError} = await supabase
            .from('gp')
            .insert([{cup_id: cupId}])
            .select()
            .single()

        if (gpError) {
            console.error("Error inserting GP:", gpError)
            return res.status(500).json({ error: "Failed to insert GP" })
        }

        const gpId = gpData.gp_id

        // Now insert each participant and their placement
        const participantRows = Object.values(participants).map((p) => ({
            gp_id: gpId,
            user_id: p.userId,
            place: p.place,
        }));


        const { error: participantError } = await supabase
            .from('gp_participant')
            .insert(participantRows)

        if (participantError) {
            console.error("Error inserting GP participant", participantError)
            return res.status(500).json({ error: "Failed to insert GP participant"})
        }

        res.status(201).json({
            message: 'GP inserted successfully',
            gp: gpData,
            participants: participantRows
        })
    } catch (err) {
        console.error('Server error: ', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Post a KO tour with participants
app.post('/ko', async (req, res) => {
    try {
        const { rallyId, participants} = req.body

        if (!rallyId || !participants || participants.length === 0) {
            return res.status(400).json({ error: "Rally selection and players are required."})
        }

        // Insert race data
        const {data: koData, error: koError} = await supabase
            .from('ko')
            .insert([{rally_id: rallyId}])
            .select()
            .single()

        if (koError) {
            console.error("Error inserting KO Tour:", koError)
            return res.status(500).json({ error: "Failed to insert KO Tour" })
        }

        const koId = koData.ko_id

        // Now insert each participant and their placement
        const participantRows = Object.values(participants).map((p) => ({
            ko_id: koId,
            user_id: p.userId,
            place: p.place,
        }));


        const { error: participantError } = await supabase
            .from('ko_participant')
            .insert(participantRows)

        if (participantError) {
            console.error("Error inserting KO tour participant", participantError)
            return res.status(500).json({ error: "Failed to insert KO tour participant"})
        }

        res.status(201).json({
            message: 'KO tour inserted successfully',
            ko: koData,
            participants: participantRows
        })
    } catch (err) {
        console.error('Server error: ', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//Protect API routes
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'No token provided'})
    
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET)
        req.user = payload
        next()
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' })
    }
}

app.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Hello user ${req.user.sub}`})
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
