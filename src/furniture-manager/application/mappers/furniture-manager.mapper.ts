import { FurnitureManager } from "src/furniture-manager/domain/entities/furniture-manager.entity";
import { FurnitureManagerTypeORM } from "src/furniture-manager/infrastructure/persistence/typeorm/entities/furniture-manager.typeorm";

export class FurnitureManagerMapper {
    public static ToTypeOrm(furnitureManager: FurnitureManager): FurnitureManagerTypeORM {
        const furnitureManagerTypeOrm: FurnitureManagerTypeORM = new FurnitureManagerTypeORM();
        furnitureManagerTypeOrm.name = furnitureManager.name;
        furnitureManagerTypeOrm.id = furnitureManager.id.getValue();
        return furnitureManagerTypeOrm;
    }
}