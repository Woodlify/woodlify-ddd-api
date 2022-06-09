import { Account } from '../value-objects/account.value';
import { UserType } from '../enums/user-type.enum';
import { CustomerName } from '../../../common/domain/value-objects/customer-name.value';
import { User } from './user.entity';
import { CustomerRegistered } from '../events/customer-registered.event';
import { CardId } from '../value-objects/card-id.value';

export class Customer extends User {
  private name: CustomerName;
  private cardId: CardId;
  public constructor(name: CustomerName, account: Account, cardId: CardId) {
    super(UserType.CUSTOMER, account);
    this.name = name;
    this.cardId = cardId;
  }
  public register() {
    const event = new CustomerRegistered(
      this.id.getValue(),
      this.getAccount().getUsername(),
      this.getAccount().getEmail(),
      this.getAccount().getPassword(),
      this.name.getValue(),
      this.cardId.getValue(),
    );
    this.apply(event);
  }
  public getName(): CustomerName {
    return this.name;
  }
  public getCardId(): CardId {
    return this.cardId;
  }
  public changeName(name: CustomerName): void {
    this.name = name;
  }
  public assignCardId(cardId: CardId): void {
    this.cardId = cardId;
  }
}

