import { getRepository } from 'typeorm'
import Binance from 'node-binance-api'

import { _interval } from '../interfaces'
import { Candlestick, Pair } from '../entity'

const binance = new Binance()

export type _candlestick = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
]

const INTERVAL = '4h'

export const convertKline = (
  pair: Pair,
  interval: _interval,
  candlestick: _candlestick
): Candlestick => {
  const [
    time,
    open,
    high,
    low,
    close,
    volume,
    closeTime,
    assetVolume,
    trades,
    buyBaseVolume,
    buyAssetVolume,
    ignored
  ] = candlestick

  const instance = new Candlestick()
  instance.pair = pair
  instance.interval = interval
  instance.time = new Date(time)
  instance.open = parseFloat(open)
  instance.high = parseFloat(high)
  instance.low = parseFloat(low)
  instance.close = parseFloat(close)
  instance.volume = parseFloat(volume)
  instance.closeTime = new Date(closeTime)
  instance.assetVolume = parseFloat(assetVolume)
  instance.trades = trades
  instance.buyBaseVolume = parseFloat(buyBaseVolume)
  instance.buyAssetVolume = parseFloat(buyAssetVolume)
  instance.ignored = parseFloat(ignored)

  return instance
}

export const launchCandlestickSockets = async () => {
  const candlestickRepository = getRepository(Candlestick)
  const pairRepository = getRepository(Pair)

  try {
    await candlestickRepository.clear()
    const pairs = await pairRepository.find()
    console.log(pairs)
    for (const pair of pairs) {
      binance.candlesticks(
        pair.symbol,
        INTERVAL,
        async (error, ticks) => {
          if (error) {
            throw new Error()
          }

          const results = ticks.map((tick: _candlestick) => {
            return convertKline(pair, INTERVAL, tick)
          })

          await candlestickRepository.save(results)
        },
        { limit: 25 }
      )
    }

    binance.websockets.candlesticks(
      pairs.map((v) => v.symbol),
      INTERVAL,
      (candlesticks) => {
        const { e: eventType, E: time, s: symbol, k: ticks } = candlesticks
        const {
          T: closeTime,
          o: open,
          c: close,
          h: high,
          l: low,
          v: volume,
          n: trades,
          x: isThisKlineClosed,
          q: assetVolume,
          V: buyBaseVolume,
          Q: buyAssetVolume,
          B: ignored
        } = ticks

        // когда период закрыт
        if (isThisKlineClosed) {
          const pair = new Pair()
          pair.symbol = symbol

          const instance = new Candlestick()
          instance.pair = pair
          instance.interval = INTERVAL
          instance.time = new Date(time)
          instance.open = parseFloat(open)
          instance.high = parseFloat(high)
          instance.low = parseFloat(low)
          instance.close = parseFloat(close)
          instance.volume = parseFloat(volume)
          instance.closeTime = new Date(closeTime)
          instance.assetVolume = parseFloat(assetVolume)
          instance.trades = trades
          instance.buyBaseVolume = parseFloat(buyBaseVolume)
          instance.buyAssetVolume = parseFloat(buyAssetVolume)
          instance.ignored = parseFloat(ignored)

          candlestickRepository.save(instance)
        }
      }
    )
  } catch (e) {
    throw new Error(e)
  }
}
