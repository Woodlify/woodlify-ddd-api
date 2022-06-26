import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureState } from 'src/furniture-design/domain/enums/furnitureState.enum';
import { FurnitureFactory } from 'src/furniture-design/domain/factories/furniture.factory';
import { CanvasId } from 'src/furniture-design/domain/value-objects/canvas-id.value';
import { FurnitureId } from 'src/furniture-design/domain/value-objects/furniture-id.value';
import { FurnitureTypeORM } from 'src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { FurnitureManager } from 'src/furniture-manager/domain/entities/furniture-manager.entity';
import { DataSource, Repository } from 'typeorm';
import { SubmitDesignCommand } from '../../commands/submit-design.command';

@CommandHandler(SubmitDesignCommand)
export class SubmitDesignHandler
  implements ICommandHandler<SubmitDesignCommand>
{
  constructor(
    @InjectRepository(FurnitureTypeORM)
    private _furnitureRepository: Repository<FurnitureTypeORM>,
    private _dataSource: DataSource,
    private eventPublisher: EventPublisher
  ) {}

  async execute(command: SubmitDesignCommand): Promise<any> {
    const manager = this._dataSource.createEntityManager();
    const furnitureId: number = command.id;
    const furniture: FurnitureTypeORM = await this._furnitureRepository.findOne(
      {
        where: { id: furnitureId },
      },
    );
    if (!furniture) return;
    let furnitureUpdated: FurnitureTypeORM = { ...furniture };
    furnitureUpdated.state = FurnitureState.IN_REVIEW;
    furnitureUpdated = await this._furnitureRepository.save({
      ...furniture,
      ...furnitureUpdated,
    });
    let furnitureManager: FurnitureManager = FurnitureManager.getInstance();
    if (!furnitureManager) return;
    const furnitureEntity = FurnitureFactory.createWIthId(
      FurnitureId.create(furnitureUpdated.id),
      furnitureUpdated.designDate,
      furnitureUpdated.lastModificationDate,
      furnitureUpdated.name,
      CanvasId.create(furnitureUpdated.canvasId.value),
    );
    furnitureManager = this.eventPublisher.mergeObjectContext(furnitureManager);
    furnitureManager.changeFurnitureState(furnitureEntity);
    furnitureManager.commit();
  }
}
