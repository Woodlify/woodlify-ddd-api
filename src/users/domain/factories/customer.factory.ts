import { CustomerName } from '../../../common/domain/value-objects/customer-name.value';
import { Account } from '../value-objects/account.value';
import { Customer } from '../entities/customer.entity';

export class CustomerFactory {
  public static createFrom(name: CustomerName, account: Account) {
    return new Customer(name, account);
  }
}
