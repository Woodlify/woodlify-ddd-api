export class RegisterCarpenterResponse {
  constructor(
    public id: number,
    public carpenterName: string,
    public ruc: string,
    public email: string,
    public username: string,
    public password: string,
  ) {}
}
