import { ConnectionOptions } from 'typeorm'
import { Pair, User } from '../entity'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [User, Pair],
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE)
}

export default config
