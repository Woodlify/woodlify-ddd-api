import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureMapper } from 'src/furniture-design/application/mappers/furniture.mapper';
import { FurnitureFactory } from 'src/furniture-design/domain/factories/furniture.factory';
import { FurnitureId } from 'src/furniture-design/domain/value-objects/furniture-id.value';
import { FurnitureTypeORM } from 'src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { FurnitureManager } from 'src/furniture-manager/domain/entities/furniture-manager.entity';
import { FurnitureManagerId } from 'src/furniture-manager/domain/value-objects/furniture-manager-id.value';
import { DataSource, Repository } from 'typeorm';
import { DeleteDesignCommand } from '../../commands/delete-design.command';

@CommandHandler(DeleteDesignCommand)
export class DeleteDesignHandler
  implements ICommandHandler<DeleteDesignCommand>
{
  constructor(
    @InjectRepository(FurnitureTypeORM)
    private _furnitureRepository: Repository<FurnitureTypeORM>,
    private dataSource: DataSource,
  ) {}

  async execute(command: DeleteDesignCommand): Promise<any> {
    const manager = this.dataSource.createEntityManager();
    const furnitureId = command.id;
    const result = await manager
      .createQueryBuilder()
      .delete()
      .from(FurnitureTypeORM)
      .where('furnitureDesignId = :furnitureDesignId', { id: furnitureId })
      .execute();
    if (!result) return;
    const furnitureManager: FurnitureManager = FurnitureManager.getInstance();
    if (!furnitureManager) return;
    furnitureManager.deleteFurnitureId(command.id, command.name);
    furnitureManager.commit();
  }
}
