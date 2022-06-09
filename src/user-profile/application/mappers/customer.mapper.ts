import { Customer } from '../../domain/entities/customer.entity';
import { CustomerTypeORM } from '../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { CustomerNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/customer-name.typeorm';
import { AccountTypeORM } from '../../infrastructure/persistence/typeorm/entities/account.typeorm';
import { CardIdTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/card-id.typeorm';

export class CustomerMapper {
  public static toTypeORM(customer: Customer): CustomerTypeORM {
    const carpenterTypeORM: CustomerTypeORM = new CustomerTypeORM();
    carpenterTypeORM.name = CustomerNameTypeORM.from(
      customer.getName().getValue(),
    );
    carpenterTypeORM.account = AccountTypeORM.from(
      customer.getAccount().getUsername(),
      customer.getAccount().getPassword(),
      customer.getAccount().getEmail(),
    );
    carpenterTypeORM.cardId = CardIdTypeorm.from(
      customer.getCardId().getValue(),
    );
    return carpenterTypeORM;
  }
}
