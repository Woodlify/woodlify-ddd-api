import { AppNotification } from '../../../common/application/app-notification';
import { Result } from 'typescript-result';

export class Account {
  private readonly username: string;
  private readonly email: string;
  private readonly password: string;

  private constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public static create(
    username: string,
    email: string,
    password: string,
  ): Result<AppNotification, Account> {
    return Result.ok(new Account(username, email, password));
  }
  public static from(username: string, email: string, password: string) {
    return new Account(username, email, password);
  }
  public getUsername(): string {
    return this.username;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
}
