import { UserId } from '../value-objects/user-id.value';
import { Account } from '../value-objects/account.value';
import { UserType } from '../enums/user-type.enum';
import { CarpenterName } from '../../../common/domain/value-objects/carpenter-name.value';
import { User } from './user.entity';
import { Ruc } from '../value-objects/ruc.value';
import { CarpenterRegistered } from '../events/carpenter-registered.event';

export class Carpenter extends User {
  private name: CarpenterName;
  private ruc: Ruc;
  public constructor(name: CarpenterName, ruc: Ruc, account: Account) {
    super(UserType.CARPENTER, account);
    this.name = name;
    this.ruc = ruc;
  }
  public register() {
    const event = new CarpenterRegistered(
      this.id.getValue(),
      this.name.getValue(),
      this.ruc.getValue(),
    );
    this.apply(event);
  }
  public getId(): UserId {
    return this.id;
  }
  public getName(): CarpenterName {
    return this.name;
  }
  public getRuc(): Ruc {
    return this.ruc;
  }
  public changeName(name: CarpenterName): void {
    this.name = name;
  }
  public changeRuc(ruc: Ruc): void {
    this.ruc = ruc;
  }
}
