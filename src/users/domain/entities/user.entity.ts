import { AggregateRoot } from '@nestjs/cqrs';
import { UserId } from '../value-objects/user-id.value';
import { Account } from '../value-objects/account.value';
import { UserType } from '../enums/user-type.enum';

export class User extends AggregateRoot {
  protected id: UserId;
  protected readonly account: Account;
  protected type: UserType;
  public constructor(type: UserType, account: Account) {
    super();
    this.type = type;
    this.account = account;
  }
  public getId(): UserId {
    return this.id;
  }
  public getType(): UserType {
    return this.type;
  }
  public getAccount(): Account {
    return this.account;
  }
  public changeId(id: UserId) {
    this.id = id;
  }
}
