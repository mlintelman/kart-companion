const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins (you can restrict this later)
app.use(cors());

// Initialize Supabase client with service role key (secret, full access)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get('/users', async (req, res) => {
  try {
    // Fetch all rows from the "users" table (replace "users" with your table name)
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
