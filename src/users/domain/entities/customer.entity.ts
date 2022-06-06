import { UserId } from '../value-objects/user-id.value';
import { Account } from '../value-objects/account.value';
import { UserType } from '../enums/user-type.enum';
import { CustomerName } from '../../../common/domain/value-objects/customer-name.value';
import { User } from './user.entity';

export class Customer extends User {
  private name: CustomerName;
  public constructor(name: CustomerName, account: Account) {
    super(UserType.CUSTOMER, account);
    this.name = name;
  }
  public getId(): UserId {
    return this.id;
  }
  public getName(): CustomerName {
    return this.name;
  }
  public changeName(name: CustomerName): void {
    this.name = name;
  }
}
