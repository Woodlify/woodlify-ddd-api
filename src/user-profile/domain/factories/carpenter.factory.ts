import { CarpenterName } from '../../../common/domain/value-objects/carpenter-name.value';
import { Ruc } from '../value-objects/ruc.value';
import { Account } from '../value-objects/account.value';
import { Carpenter } from '../entities/carpenter.entity';

export class CarpenterFactory {
  public static createFrom(name: CarpenterName, ruc: Ruc, account: Account) {
    return new Carpenter(name, ruc, account);
  }
}
