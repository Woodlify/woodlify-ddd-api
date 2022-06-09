import { Column } from 'typeorm';

export class AccountTypeORM {
  @Column('varchar', { name: 'username', nullable: true })
  public username: string;
  @Column('varchar', { name: 'password', nullable: true })
  public password: string;
  @Column('varchar', { name: 'email', nullable: true })
  public email: string;

  private constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
  public static from(
    username: string,
    password: string,
    email: string,
  ): AccountTypeORM {
    return new AccountTypeORM(username, password, email);
  }
}
