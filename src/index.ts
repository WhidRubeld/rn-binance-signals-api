import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as helmet from 'helmet'
import * as cors from 'cors'

import routes from './routes'
import { DatabaseConfig } from './config'

const PORT = process.env.TYPEORM_PORT
// Create a new express application instance
const app = express()
// Call midlewares
app.use(express.json())
app.use(cors())
app.use(helmet())
//Set all routes from routes folder
app.use('/', routes)
//Connects to the Database -> then starts the express
createConnection(DatabaseConfig)
  .then(async (_connection) => {
    app.listen(PORT, () => {
      console.log('Server started on port 3000!')
    })
  })
  .catch((error) => console.log(error))
