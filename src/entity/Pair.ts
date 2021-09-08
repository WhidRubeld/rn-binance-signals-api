import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Pair {
  @PrimaryColumn()
  symbol: string
}
