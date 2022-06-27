import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanvasesController } from './api/canvases.controller';
import { FurnituresController } from './api/furnitures.controller';
import { CreateCanvasHandlder } from './application/handlers/commands/create-canvas.handler';
import { CreateDesignHandler } from './application/handlers/commands/create-design.handler';
import { ModifyDesignHandler } from './application/handlers/commands/modify-design.handler';
import { CreatedCanvasHandler } from './application/handlers/events/created-canvas.handler';
import { CreatedDesignHandler } from './application/handlers/events/created-design.handler';
import { ModifiedDesignHandler } from './application/handlers/events/modified-design.handler';
import { GetCanvasByIdHandler } from './application/handlers/queries/get-canvas-by-id.handler';
import { GetCanvasHandler } from './application/handlers/queries/get-canvas.handler';
import { GetFurnituresByIdHandler } from './application/handlers/queries/get-furniture-by-id.query';
import { GetFurnituresHandler } from './application/handlers/queries/get-furnitures.handler';
import { CanvasApplicationService } from './application/services/canvas-application.service';
import { FurnitureApplicationService } from './application/services/furniture-application.service';
import { RegisterCanvasValidator } from './application/validators/create-canvas.validator';
import { RegisterDesignValidator } from './application/validators/create-design.validator';
import { ModifyDesignValidator } from './application/validators/modify-design.validator';
import { CanvasTypeORM } from './infraestructure/persistence/typeorm/entities/canvas.typeorm';
import { EdgeTypeORM } from './infraestructure/persistence/typeorm/entities/edge.typeorm';
import { FurnitureTypeORM } from './infraestructure/persistence/typeorm/entities/furniture.typeorm';
import { PieceTypeORM } from './infraestructure/persistence/typeorm/entities/piece.typeorm';
import { TextureTypeORM } from './infraestructure/persistence/typeorm/entities/texture.typeorm';

export const CommandHandlers = [
  CreateCanvasHandlder,
  CreateDesignHandler,
  ModifyDesignHandler,
];

export const EventHandlers = [
  CreatedCanvasHandler,
  CreatedDesignHandler,
  ModifiedDesignHandler,
];

export const QueryHandlers = [
  GetCanvasHandler,
  GetCanvasByIdHandler,
  GetFurnituresHandler,
  GetFurnituresByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      CanvasTypeORM,
      FurnitureTypeORM,
      PieceTypeORM,
      TextureTypeORM,
      EdgeTypeORM,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [FurnituresController, CanvasesController],
  providers: [
    CanvasApplicationService,
    FurnitureApplicationService,
    RegisterCanvasValidator,
    RegisterDesignValidator,
    ModifyDesignValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class FurnitureDesignModule {}
