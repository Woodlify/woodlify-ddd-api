import { Furniture } from "src/furniture-design/domain/aggregates/furniture-design.entity";
import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { FurnitureTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { PieceTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/entities/piece.typeorm";
import { CanvasIdTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/value-objects/canvas-id.typeorm";
import { PieceMapper } from "./piece.mapper";

export class FurnitureMapper {
    public static toTypeOrm(furniture: Furniture): FurnitureTypeorm {
        const furnitureTypeOrm: FurnitureTypeorm = new FurnitureTypeorm();
        furnitureTypeOrm.canvasId = CanvasIdTypeorm.from(furniture.canvasId.getCanvasId());
        furnitureTypeOrm.designDate = furniture.designDate;
        furnitureTypeOrm.lastModificationDate = furniture.lastModificationDate;
        furnitureTypeOrm.name = furniture.name;
        const piecesTypeOrm: PieceTypeorm[] = [];
        furniture.getShapes().forEach( (piece: Piece) =>  {
            piecesTypeOrm.push(PieceMapper.toTypeOrm(piece));
        });
        furnitureTypeOrm.pieces = piecesTypeOrm;
        return furnitureTypeOrm;
    } 
}