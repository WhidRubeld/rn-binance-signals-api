import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { Pair } from '../entity/Pair'

const data = [{ symbol: 'ETHUSDT' }, { symbol: 'BTCUSDT' }]
const pairs = data.map((v) => {
  const pair = new Pair()
  pair.symbol = v.symbol
  return pair
})
const pairRepository = getRepository(Pair)

export class firstPairs1631100413918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await pairRepository.save(pairs)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await pairRepository.remove(pairs)
  }
}
