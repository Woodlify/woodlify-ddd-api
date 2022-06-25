import { RejectDesignCommand } from '../../commands/reject-design.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureTypeORM } from '../../../../furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { Repository } from 'typeorm';

@CommandHandler(RejectDesignCommand)
export class RejectDesignHandler
  implements ICommandHandler<RejectDesignCommand>
{
  constructor(
    @InjectRepository(FurnitureTypeORM)
    private furnitureRepository: Repository<FurnitureTypeORM>,
  ) {}

  async execute(command: RejectDesignCommand) {
    const furnitureId: number = command.id;
    let furnitureTypeORM: FurnitureTypeORM = await this.furnitureRepository
      .createQueryBuilder()
      .where('id = :id')
      .setParameter('id', furnitureId)
      .getOne();
    if (furnitureTypeORM == null) {
      return false;
    }
    furnitureTypeORM.state = command.status;
    furnitureTypeORM = await this.furnitureRepository.save(furnitureTypeORM);
    if (furnitureTypeORM == null) {
      return false;
    }
    return true;
  }
}
