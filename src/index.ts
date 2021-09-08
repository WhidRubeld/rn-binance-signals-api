import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import expressWs from 'express-ws'

import routes from './routes'
import { DatabaseConfig } from './config'
import { echoSocketHandler, launchCandlestickSockets } from './utils'

const PORT = process.env.PORT
// Create a new express application instance
const app = expressWs(express()).app
// Call midlewares
app.use(express.json())
app.use(cors())
app.use(helmet())
//Set all routes from routes folder
app.use('/', routes)
app.ws('/echo', echoSocketHandler)

//Connects to the Database -> then starts the express
createConnection(DatabaseConfig)
  .then(async (_connection) => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`)
    })

    launchCandlestickSockets()
  })
  .catch((error) => console.log(error))
