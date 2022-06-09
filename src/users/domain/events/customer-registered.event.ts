import { UserRegistered } from './user-registered.event';

export class CustomerRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly cardId: number,
  ) {
    super(id, username, email, password, name);
  }
}
