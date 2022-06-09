import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CarpenterRegistered } from '../../../domain/events/carpenter-registered.event';

@EventsHandler(CarpenterRegistered)
export class CarpenterRegisteredHandler
  implements IEventHandler<CarpenterRegistered>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async handle(event: CarpenterRegistered) {
    console.log('handle logic for CarpenterRegistered');
    console.log(event);
  }
}
