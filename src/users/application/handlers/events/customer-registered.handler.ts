import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CustomerRegistered } from '../../../domain/events/customer-registered.event';

@EventsHandler(CustomerRegistered)
export class CompanyRegisteredHandler
  implements IEventHandler<CustomerRegistered>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async handle(event: CustomerRegistered) {
    console.log('handle logic for CustomerRegistered');
    console.log(event);
  }
}
