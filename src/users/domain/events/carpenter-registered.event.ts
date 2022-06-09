import { UserRegistered } from './user-registered.event';

export class CarpenterRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly ruc: string,
  ) {
    super(id, username, email, password, name);
  }
}
