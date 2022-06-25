import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DesignPublishedEvent } from '../../../domain/events/design-published.event';
import { FurnitureTypeORM } from '../../../../furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { Repository } from 'typeorm';
import { PublishDesignCommand } from '../../commands/publish-design.command';
import { FurnitureState } from '../../../../furniture-design/domain/enums/furnitureState.enum';
import { InjectRepository } from '@nestjs/typeorm';

@EventsHandler(DesignPublishedEvent)
export class DesignPublishedHandler
  implements IEventHandler<DesignPublishedEvent>
{
  constructor(
    @InjectRepository(FurnitureTypeORM)
    private furnitureRepository: Repository<FurnitureTypeORM>,
    private commandBus: CommandBus,
  ) {}

  async handle(event: DesignPublishedEvent) {
    console.log('Design published');
    const publishDesign = new PublishDesignCommand(
      event.furnitureDesignId,
      FurnitureState.PUBLISHED,
    );
    await this.commandBus.execute(publishDesign);
  }
}
