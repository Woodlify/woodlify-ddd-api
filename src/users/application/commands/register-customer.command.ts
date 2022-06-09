export class RegisterCustomer {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
    public readonly cardId: number,
  ) {}
}
