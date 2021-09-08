import { ConnectionOptions } from 'typeorm'

import { Candlestick, Pair, User } from '../entity'
import { CandlestickSubscriber } from '../subscriber'

import { firstPairs1631100413918 } from '../migration/1631100413918-first_pairs'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [User, Pair, Candlestick],
  migrations: [firstPairs1631100413918],
  subscribers: [CandlestickSubscriber],
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE)
}

export default config
