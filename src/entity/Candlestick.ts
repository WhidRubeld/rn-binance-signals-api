import { IsDate } from 'class-validator'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique
} from 'typeorm'
import { _interval } from '../interfaces'
import { Pair } from './Pair'

@Entity()
@Unique(['pair', 'interval', 'closeTime'])
export class Candlestick {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  interval: _interval

  @Column('timestamp')
  @IsDate()
  time: Date

  @Column('float')
  open: number

  @Column('float')
  high: number

  @Column('float')
  low: number

  @Column('float')
  close: number

  @Column('float')
  volume: number

  @Column('timestamp')
  @IsDate()
  closeTime: Date

  @Column('float')
  assetVolume: number

  @Column()
  trades: number

  @Column('float')
  buyBaseVolume: number

  @Column('float')
  buyAssetVolume: number

  @Column()
  ignored: number

  @ManyToOne(() => Pair, (pair) => pair.candlesticks)
  pair: Pair

  @Column()
  closed: boolean

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
