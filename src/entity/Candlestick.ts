import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { _interval } from '../interfaces'
import { Pair } from './Pair'

@Entity()
export class Candlestick {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  interval: _interval

  @Column()
  time: number

  @Column()
  open: number

  @Column()
  high: number

  @Column()
  low: number

  @Column()
  close: number

  @Column()
  volume: number

  @Column()
  closeTime: number

  @Column()
  assetVolume: number

  @Column()
  trades: number

  @Column()
  buyBaseVolume: number

  @Column()
  buyAssetVolume: number

  @Column()
  ignored: number

  @ManyToOne(() => Pair, (pair) => pair.candlesticks)
  pair: Pair

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
