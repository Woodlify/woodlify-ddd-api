import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCarpenter } from '../../commands/register-carpenter.command';
import { Repository } from 'typeorm';
import { UserId } from '../../../domain/value-objects/user-id.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app-notification';
import { CarpenterMapper } from '../../mappers/carpenter.mapper';
import { CarpenterName } from '../../../../common/domain/value-objects/carpenter-name.value';
import { CarpenterFactory } from '../../../domain/factories/carpenter.factory';
import { Carpenter } from '../../../domain/entities/carpenter.entity';
import { CarpenterTypeORM } from '../../../infrastructure/persistence/typeorm/entities/carpenter.typeorm';
import { Account } from '../../../domain/value-objects/account.value';

@CommandHandler(RegisterCarpenter)
export class RegisterCompanyHandler
  implements ICommandHandler<RegisterCarpenter> {
  constructor(
    @InjectRepository(CarpenterTypeORM)
    private carpenterRepository: Repository<CarpenterTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterCarpenter) {
    let carpenterId = 0;
    const carpenterNameResult: Result<AppNotification, CarpenterName> =
      CarpenterName.create(command.name);
    if (carpenterNameResult.isFailure()) {
      return carpenterId;
    }
    const rucResult: Result<AppNotification, Ruc> = Ruc.create(command.ruc);
    if (rucResult.isFailure()) {
      return carpenterId;
    }
    if (rucResult.isFailure()) {
      return carpenterId;
    }
    const accountResult: Result<AppNotification, Account> = Account.create(
      command.username,
      command.email,
      command.password,
    );
    if (accountResult.isFailure()) {
      return carpenterId;
    }
    const account: Account= Account.from(command.username,command.email,command.password);
    let carpenter: Carpenter = CarpenterFactory.createFrom(
      carpenterNameResult.value,
      rucResult.value,
      account,
    );
    let carpenterTypeORM: CarpenterTypeORM = CarpenterMapper.toTypeORM(carpenter);
    carpenterTypeORM = await this.carpenterRepository.save(carpenterTypeORM);
    if (carpenterTypeORM == null) {
      return carpenterId;
    }
    carpenterId = Number(carpenterTypeORM.id);
    carpenter.changeId(UserId.of(carpenterId));
    carpenter = this.publisher.mergeObjectContext(carpenter);
    carpenter.register();
    carpenter.commit();
    return carpenterId;
  }
}
