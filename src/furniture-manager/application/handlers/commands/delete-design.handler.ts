import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureTypeORM } from 'src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { FurnitureManager } from 'src/furniture-manager/domain/entities/furniture-manager.entity';
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
    const furnitureId = command.furnitureDesignId;
    const result = await manager
      .createQueryBuilder()
      .delete()
      .from(FurnitureTypeORM)
      .where('furnitureDesignId = :furnitureDesignId', { id: furnitureId })
      .execute();
    if (!result) return false;
    const furnitureManager: FurnitureManager = FurnitureManager.getInstance();
    if (!furnitureManager) return false;
    furnitureManager.deleteFurnitureId(command.furnitureDesignId, command.furnitureDesignName);
    furnitureManager.commit();
    return true;
  }
}
