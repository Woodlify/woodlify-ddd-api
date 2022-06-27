import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Furniture } from "src/furniture-design/domain/aggregates/furniture-design.entity";
import { FurnitureFactory } from "src/furniture-design/domain/factories/furniture.factory";
import { CanvasId } from "src/furniture-design/domain/value-objects/canvas-id.value";
import { FurnitureId } from "src/furniture-design/domain/value-objects/furniture-id.value";
import { FurnitureTypeORM } from "src/furniture-design/infrastructure/persistence/typeorm/entities/furniture.typeorm";
import { FurnitureManager } from "src/furniture-manager/domain/entities/furniture-manager.entity";
import { Repository } from "typeorm";
import { AcceptDesignCommand } from "../../commands/accept-design.command";

@CommandHandler(AcceptDesignCommand)
export class AcceptDesignHandler implements ICommandHandler<AcceptDesignCommand> {
    constructor(
        @InjectRepository(FurnitureTypeORM)
        private furnitureRepository: Repository<FurnitureTypeORM>,
        private eventPublisher: EventPublisher
      ) {}
    
      async execute(command: AcceptDesignCommand) {
        let furnitureId: number = command.furnitureDesignId;
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
        furnitureId = Number(furnitureTypeORM.id);
        const furniture: Furniture = FurnitureFactory.createWIthId(
            FurnitureId.create(furnitureId),
            new Date(),
            new Date(),
            " ",
            CanvasId.create(0)
        );
        furniture.changeState(furnitureTypeORM.state);
        let furnitureManager: FurnitureManager = FurnitureManager.getInstance();
        if(!furnitureManager) return false;
        furnitureManager = this.eventPublisher.mergeObjectContext(furnitureManager);
        furnitureManager.acceptDesign(furniture);
        furnitureManager.commit();
        return true;
      }
    
}