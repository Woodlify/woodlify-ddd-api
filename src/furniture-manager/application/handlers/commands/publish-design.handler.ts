import { PublishDesignCommand } from '../../commands/publish-design.command';
import { FurnitureTypeORM } from '../../../../furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { Repository } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(PublishDesignCommand)
export class PublishDesignHandler
  implements ICommandHandler<PublishDesignCommand>
{
  constructor(
    @InjectRepository(FurnitureTypeORM)
    private furnitureRepository: Repository<FurnitureTypeORM>,
  ) {}

  async execute(command: PublishDesignCommand) {
    const furnitureId: number = command.furnitureDesignId;
    let furnitureTypeORM: FurnitureTypeORM = await this.furnitureRepository
      .createQueryBuilder()
      .where('id = :id')
      .setParameter('id', furnitureId)
      .getOne();
    if (furnitureTypeORM == null) {
      return false;
    }
    furnitureTypeORM.state = command.furnitureState;
    furnitureTypeORM = await this.furnitureRepository.save(furnitureTypeORM);
    if (furnitureTypeORM == null) {
      return false;
    }
    return true;
  }
}
