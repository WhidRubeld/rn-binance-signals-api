import { ConnectionOptions } from 'typeorm'
import { User } from '../entity'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'binance-signals',
  entities: [User],
  synchronize: true
}

console.log(config)

export default config
