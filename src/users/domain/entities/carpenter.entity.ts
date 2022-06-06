import { UserId } from '../value-objects/user-id.value';
import { Account } from '../value-objects/account.value';
import { UserType } from '../enums/user-type.enum';
import { CarpenterName } from '../../../common/domain/value-objects/carpenter-name.value';
import { User } from './user.entity';

export class Carpenter extends User {
  private name: CarpenterName;
  public constructor(name: CarpenterName, account: Account) {
    super(UserType.CARPENTER, account);
    this.name = name;
  }
  public getId(): UserId {
    return this.id;
  }
  public getName(): CarpenterName {
    return this.name;
  }
  public changeName(name: CarpenterName): void {
    this.name = name;
  }
}
