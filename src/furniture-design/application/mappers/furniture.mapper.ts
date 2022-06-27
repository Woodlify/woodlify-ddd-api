import { Furniture } from "src/furniture-design/domain/aggregates/furniture-design.entity";
import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { FurnitureTypeORM } from "src/furniture-design/infrastructure/persistence/typeorm/entities/furniture.typeorm";
import { PieceTypeORM } from "src/furniture-design/infrastructure/persistence/typeorm/entities/piece.typeorm";
import { CanvasIdTypeORM } from "src/furniture-design/infrastructure/persistence/typeorm/value-objects/canvas-id.typeorm";
import { PieceMapper } from "./piece.mapper";

export class FurnitureMapper {
    public static toTypeOrm(furniture: Furniture): FurnitureTypeORM {
        const furnitureTypeOrm: FurnitureTypeORM = new FurnitureTypeORM();
        furnitureTypeOrm.canvasId = CanvasIdTypeORM.from(furniture.canvasId.getCanvasId());
        furnitureTypeOrm.designDate = furniture.designDate;
        furnitureTypeOrm.lastModificationDate = furniture.lastModificationDate;
        furnitureTypeOrm.name = furniture.name;
        const piecesTypeOrm: PieceTypeORM[] = [];
        furniture.getShapes().forEach( (piece: Piece) =>  {
            piecesTypeOrm.push(PieceMapper.toTypeOrm(piece));
        });
        furnitureTypeOrm.pieces = piecesTypeOrm;
        return furnitureTypeOrm;
    } 
}