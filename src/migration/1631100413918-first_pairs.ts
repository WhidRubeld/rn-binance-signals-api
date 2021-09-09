import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { Pair } from '../entity/Pair'

const data = [
  { symbol: 'BTCUSDT' },
  { symbol: 'ETHBTC' },
  { symbol: 'ETHUSDT' },
  { symbol: 'LTCBTC' },
  { symbol: 'LTCUSDT' },
  { symbol: 'BNBETH' },
  { symbol: 'BNBBTC' },
  { symbol: 'BNBUSDT' },
  { symbol: 'ETCBTC' },
  { symbol: 'ETCUSDT' },
  { symbol: 'NEOBTC' },
  { symbol: 'IOTABTC' },
  { symbol: 'QTUMBTC' },
  { symbol: 'ADABTC' },
  { symbol: 'ATOMBTC' },
  { symbol: 'BATBTC' },
  { symbol: 'DOTBTC' },
  { symbol: 'IOSTBTC' },
  { symbol: 'ONTBTC' },
  { symbol: 'BCHBTC' },
  { symbol: 'BCHUSDT' },
  { symbol: 'EOSBTC' },
  { symbol: 'XMRBTC' },
  { symbol: 'XMRUSDT' },
  { symbol: 'ZECBTC' },
  { symbol: 'ZECUSDT' },
  { symbol: 'DASHBTC' },
  { symbol: 'DASHUSDT' }
]
const pairs = data.map((v) => {
  const pair = new Pair()
  pair.symbol = v.symbol
  return pair
})

export class firstPairs1631100413918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pairRepository = getRepository(Pair)
    await pairRepository.save(pairs)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const pairRepository = getRepository(Pair)
    await pairRepository.remove(pairs)
  }
}
