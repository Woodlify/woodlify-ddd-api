import { ApiProperty } from "@nestjs/swagger";

export class RegisterCarpenterRequestDto {
  @ApiProperty()
  public carpenterName: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public username: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public ruc: string;
}
