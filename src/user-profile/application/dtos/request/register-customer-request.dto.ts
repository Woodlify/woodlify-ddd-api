import { ApiProperty } from "@nestjs/swagger";

export class RegisterCustomerRequest {
  @ApiProperty()
  public customerName: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public username: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public cardId: number;
}
