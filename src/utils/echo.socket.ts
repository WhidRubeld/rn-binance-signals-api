import { classToPlain } from 'class-transformer'
import { NextFunction, Request } from 'express'
import { getRepository } from 'typeorm'
import * as WebSocket from 'ws'
import { Candlestick, Pair } from '../entity'

export const echoSocketHandler = async (
  ws: WebSocket,
  req: Request,
  next: NextFunction
) => {
  const pairRepository = getRepository(Pair)
  const candlestickRepository = getRepository(Candlestick)

  try {
    const pairs = await pairRepository.find()

    const results = []
    pairs.forEach((v) => (results[v.symbol] = {}))

    for (const pair of pairs) {
      const ticks = await candlestickRepository.find({
        where: {
          pair,
          interval: '4h'
        }
      })

      ws.send(
        JSON.stringify({
          type: 'refresh',
          pair,
          interval: '4h',
          ticks: ticks.map((v) => classToPlain(v))
        }),
        (err) => {
          if (err) next()
        }
      )
    }
  } catch (e) {
    console.log('exit')
    next()
  }
}
