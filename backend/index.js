import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

console.log('Node.js version:', process.version);

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin: "https://kart-companion-ebon.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}))
app.options('*', cors())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

app.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});


app.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database query failed' })
    }
    res.json(data)
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
