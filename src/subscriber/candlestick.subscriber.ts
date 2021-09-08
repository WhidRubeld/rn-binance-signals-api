import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent
} from 'typeorm'
import { submitEventHandler } from '../utils'

@EventSubscriber()
export class CandlestickSubscriber implements EntitySubscriberInterface<any> {
  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<any>) {
    console.log(`AFTER ENTITY INSERTED: `, event.entity)
    submitEventHandler(event.entity)
  }
  /**
   * Called after entity removal.
   */
  afterRemove(event: RemoveEvent<any>) {
    console.log(
      `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity
    )
  }
}
