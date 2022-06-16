import { Furniture } from "src/FurnitureDesign/domain/aggregates/furniture-design.entity";
import { Piece } from "src/FurnitureDesign/domain/entities/piece.entity";
import { CanvasTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/canvas.typeorm";
import { FurnitureTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { PieceTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/piece.typeorm";
import { CanvasIdTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/value-objects/canvas-id.typeorm";
import { CanvasMapper } from "./canvas.mapper";
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