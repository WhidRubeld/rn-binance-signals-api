import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent
} from 'typeorm'
import { Candlestick } from '../entity'
import { submitEventHandler } from '../utils'

@EventSubscriber()
export class CandlestickSubscriber implements EntitySubscriberInterface<any> {
  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<Candlestick>) {
    console.log(`AFTER ENTITY INSERTED: `, event.entity)
    submitEventHandler(event.entity, 'add')
  }
  /**
   * Called after entity removal.
   */
  afterRemove(event: RemoveEvent<Candlestick>) {
    console.log(
      `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity
    )
  }
  /**
   * Called after entity update.
   */
  afterUpdate(event: UpdateEvent<Candlestick>) {
    console.log(`AFTER ENTITY UPDATED: `, event.entity)
    submitEventHandler(event.entity, 'update')
  }
}
