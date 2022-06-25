import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { FurnitureManagerCreated } from "src/furniture-manager/domain/events/furniture-manager-created.event";
import { FurnitureManagerTypeORM } from "src/furniture-manager/infrastructure/persistence/typeorm/entities/furniture-manager.typeorm";
import { Repository } from "typeorm";


@EventsHandler(FurnitureManagerCreated)
export class FurnitureManagerCreatedHandler implements IEventHandler<FurnitureManagerCreated> {

    constructor (
        @InjectRepository(FurnitureManagerTypeORM)
        private _furnitureManagerRepository: Repository<FurnitureManagerTypeORM>
    ) {}

    async handle(event: FurnitureManagerCreated) {
        console.log("Furniture Manager Created");
    }
    
}