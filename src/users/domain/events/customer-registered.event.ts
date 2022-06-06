import { UserRegistered } from './user-registered.event';

export class CustomerRegistered extends UserRegistered {
  constructor(public readonly id: number, public readonly name: string) {
    super(id);
  }
}
