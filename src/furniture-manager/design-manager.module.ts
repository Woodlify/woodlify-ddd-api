import { AcceptDesignHandler } from './application/handlers/commands/accept-design.handler';
import { CreateFurnitureManagerHandler } from './application/handlers/commands/create-furniture-manager.handler';
import { DeleteDesignHandler } from './application/handlers/commands/delete-design.handler';
import { PublishDesignHandler } from './application/handlers/commands/publish-design.handler';
import { RejectDesignHandler } from './application/handlers/commands/reject-design.handler';
import { SubmitDesignHandler } from './application/handlers/commands/submit-design.handler';
import { DesignAcceptedEventHandler } from './application/handlers/events/design-accepted.handler';
import { DesignDeletedHandler } from './application/handlers/events/design-deleted-event.handler';
import { DesignPublishedHandler } from './application/handlers/events/design-published.handler';
import { DesignRejectedHandler } from './application/handlers/events/design-rejected.handler';
import { DesignSubmittedHandler } from './application/handlers/events/design-submitted.handler';
import { FurnitureManagerCreatedHandler } from './application/handlers/events/furniture-manager-created.handler';
import { GetFurnitureManagerHandler } from './application/handlers/queries/get-furniture-manager.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FurnitureManagerTypeORM } from './infrastructure/persistence/typeorm/entities/furniture-manager.typeorm';
import { CreateFurnitureManagerValidator } from './application/validators/create-furniture-design.validator';
import { FurnitureManagerApplicationService } from './application/services/furniture-manager-application.service';
import { FurnitureManagerController } from './api/furniture-manager.controller';
import { Module } from '@nestjs/common';
import { GetFurnitureManagerByIdHandler } from './application/handlers/queries/get-furniture-by-id.handler';
import { FurnitureTypeORM } from '../furniture-design/infrastructure/persistence/typeorm/entities/furniture.typeorm';

export const CommandHandlers = [
  AcceptDesignHandler,
  CreateFurnitureManagerHandler,
  DeleteDesignHandler,
  PublishDesignHandler,
  RejectDesignHandler,
  SubmitDesignHandler,
];

export const EventHandlers = [
  DesignAcceptedEventHandler,
  DesignDeletedHandler,
  DesignPublishedHandler,
  DesignRejectedHandler,
  DesignSubmittedHandler,
  FurnitureManagerCreatedHandler,
];

export const QueryHandlers = [
  GetFurnitureManagerByIdHandler,
  GetFurnitureManagerHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FurnitureTypeORM, FurnitureManagerTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [FurnitureManagerController],
  providers: [
    CreateFurnitureManagerValidator,
    FurnitureManagerApplicationService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class DesignManagerModule {}
