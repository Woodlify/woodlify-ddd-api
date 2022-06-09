import { CustomerName } from '../../../common/domain/value-objects/customer-name.value';
import { Account } from '../value-objects/account.value';
import { Customer } from '../entities/customer.entity';
import { CardId } from '../value-objects/card-id.value';

export class CustomerFactory {
  public static createFrom(
    name: CustomerName,
    account: Account,
    cardId: CardId,
  ) {
    return new Customer(name, account, cardId);
  }
}
