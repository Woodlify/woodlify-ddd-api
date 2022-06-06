import { UserRegistered } from './user-registered.event';

export class CarpenterRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly ruc: string,
  ) {
    super(id);
  }
}
