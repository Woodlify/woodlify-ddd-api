import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DesignPublishedEvent } from '../../../domain/events/design-published.event';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureTypeORM } from '../../../../furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { Repository } from 'typeorm';
import { PublishDesignCommand } from '../../commands/publish-design.command';
import { FurnitureState } from '../../../../furniture-design/domain/enums/furnitureState.enum';
import { DesignRejectedEvent } from '../../../domain/events/design-rejected.event';

@EventsHandler(DesignRejectedEvent)
export class DesignRejectedHandler
  implements IEventHandler<DesignRejectedEvent>
{
  constructor(
    @InjectRepository(FurnitureTypeORM)
    private furnitureRepository: Repository<FurnitureTypeORM>,
    private commandBus: CommandBus,
  ) {}

  async handle(event: DesignRejectedEvent) {
    console.log('Design rejected');
    const publishDesign = new PublishDesignCommand(
      event.furnitureDesignId,
      FurnitureState.REJECTED,
    );
    await this.commandBus.execute(publishDesign);
  }
}
