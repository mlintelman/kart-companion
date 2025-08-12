import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8080 || 5000

app.use(cors())
app.use(express.json())

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' })
})

// Log all registered routes after they are defined
const logRoutes = () => {
  console.log('Registered routes:')
  app._router.stack.forEach(middleware => {
    if (middleware.route && middleware.route.path) {
      console.log(`${Object.keys(middleware.route.methods).join(',').toUpperCase()} ${middleware.route.path}`)
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          console.log(`${Object.keys(handler.route.methods).join(',').toUpperCase()} ${handler.route.path}`)
        }
      })
    }
  })
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  logRoutes()
})
