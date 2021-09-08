import { Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Candlestick } from './Candlestick'

@Entity()
export class Pair {
  @PrimaryColumn()
  symbol: string

  @OneToMany(() => Candlestick, (candlestick) => candlestick.pair)
  candlesticks: Candlestick[]
}
