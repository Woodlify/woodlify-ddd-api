import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Furniture } from "src/furniture-design/domain/aggregates/furniture-design.entity";
import { FurnitureFactory } from "src/furniture-design/domain/factories/furniture.factory";
import { FurnitureId } from "src/furniture-design/domain/value-objects/furniture-id.value";
import { FurnitureTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { Repository } from "typeorm";
import { CreateDesignCommand } from "../../commands/create-desing.command";
import { FurnitureMapper } from "../../mappers/furniture.mapper";

@CommandHandler(CreateDesignCommand)
export class CreateDesignHandler implements ICommandHandler<CreateDesignCommand> {

    constructor (
        @InjectRepository(FurnitureTypeORM)
        private _furnitureRepository: Repository<FurnitureTypeORM>,
        private _publisher: EventPublisher
    ) {}

    async execute(command: CreateDesignCommand): Promise<any> {
        let furnitureId: number = 0;
        const piecesLength: number = command.pieces.length;
        if(piecesLength <= 0)
            return furnitureId;
        let furniture: Furniture = FurnitureFactory.createFrom(
            command.designedDate,
            command.lastModification,
            command.name,
            command.canvasId
        );
        let furnitureTypeOrm: FurnitureTypeORM = FurnitureMapper.toTypeOrm(furniture);
        furnitureTypeOrm = await this._furnitureRepository.save(furnitureTypeOrm);
        if( furnitureTypeOrm == null )
            return furnitureId;
        furnitureId = Number(furnitureTypeOrm.id);
        furniture.changeId(FurnitureId.create(furnitureId));
        furniture.register();
        furniture.commit();
        return furnitureId;
    }

}