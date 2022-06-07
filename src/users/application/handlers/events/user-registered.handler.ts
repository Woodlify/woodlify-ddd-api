import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserRegistered } from '../../../domain/events/user-registered.event';

@EventsHandler(UserRegistered)
export class UserRegisteredHandler implements IEventHandler<UserRegistered> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async handle(event: UserRegistered) {
    console.log('handle logic for UserRegistered');
    console.log(event);
  }
}
