import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureManager } from 'src/furniture-manager/domain/entities/furniture-manager.entity';
import { FurnitureManagerId } from 'src/furniture-manager/domain/value-objects/furniture-manager-id.value';
import { FurnitureManagerTypeORM } from 'src/furniture-manager/infrastructure/persistence/typeorm/entities/furniture-manager.typeorm';
import { Repository } from 'typeorm';
import { CreateFurnitureManagerCommand } from '../../commands/create-furniture-manager.command';
import { FurnitureManagerMapper } from '../../mappers/furniture-manager.mapper';

@CommandHandler(CreateFurnitureManagerCommand)
export class CreateFurnitureManagerHandler
  implements ICommandHandler<CreateFurnitureManagerCommand>
{
  constructor(
    @InjectRepository(FurnitureManagerTypeORM)
    private _furnitureManagerRepository: Repository<FurnitureManagerTypeORM>,
  ) {}
  async execute(command: CreateFurnitureManagerCommand): Promise<any> {
    let furnitureManagerId = 0;
    FurnitureManager.setInstance(
      FurnitureManagerId.create(command.id),
      command.name,
    );
    const furnitureManager = FurnitureManager.getInstance();
    furnitureManager.furnitures = command.furnitures;
    let furnitureTypeORM: FurnitureManagerTypeORM =
      FurnitureManagerMapper.ToTypeOrm(furnitureManager);
    furnitureTypeORM = await this._furnitureManagerRepository.save(
      furnitureTypeORM,
    );
    if (furnitureTypeORM == null) return furnitureManagerId;
    furnitureManagerId = Number(furnitureTypeORM.id);
    furnitureManager.changeId(FurnitureManagerId.create(furnitureTypeORM.id));
    furnitureManager.register();
    furnitureManager.commit();
    return furnitureManagerId;
  }
}
