import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCustomer } from '../../commands/register-customer.command';
import { Repository } from 'typeorm';
import { UserId } from '../../../domain/value-objects/user-id.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app-notification';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { CustomerName } from '../../../../common/domain/value-objects/customer-name.value';
import { CustomerFactory } from '../../../domain/factories/customer.factory';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { Account } from '../../../domain/value-objects/account.value';
import { CardId } from "../../../domain/value-objects/card-id.value";

@CommandHandler(RegisterCustomer)
export class RegisterCustomerHandler
  implements ICommandHandler<RegisterCustomer>
{
  constructor(
    @InjectRepository(CustomerTypeORM)
    private customerRepository: Repository<CustomerTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterCustomer) {
    let customerId = 0;
    let cardId = null;
    const customerNameResult: Result<AppNotification, CustomerName> =
      CustomerName.create(command.name);
    if (customerNameResult.isFailure()) {
      return customerId;
    }

    const accountResult: Result<AppNotification, Account> = Account.create(
      command.username,
      command.email,
      command.password,
    );
    if (accountResult.isFailure()) {
      return customerId;
    }
    const account: Account = Account.from(
      command.username,
      command.email,
      command.password,
    );
    if (command.cardId != null) {
      cardId = CardId.of(command.cardId);
    }

    let customer: Customer = CustomerFactory.createFrom(
      customerNameResult.value,
      account,
      cardId,
    );
    let customerTypeORM: CustomerTypeORM = CustomerMapper.toTypeORM(customer);
    customerTypeORM = await this.customerRepository.save(customerTypeORM);
    if (customerTypeORM == null) {
      return customerId;
    }
    customerId = Number(customerTypeORM.id);
    customer.changeId(UserId.of(customerId));
    customer = this.publisher.mergeObjectContext(customer);
    customer.register();
    customer.commit();
    return customerId;
  }
}
