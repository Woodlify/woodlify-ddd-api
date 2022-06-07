export class RegisterCustomerResponse {
  constructor(
    public id: number,
  public customerName: string,
  public email: string,
  public username: string,
  public password: string,
  ) {
  }

}
