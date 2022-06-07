export class EditCarpenterRequest {
  constructor(
    public readonly name: string,
    public readonly ruc: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
