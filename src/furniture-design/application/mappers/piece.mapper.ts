import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { PieceTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/piece.typeorm";

export class PieceMapper {
    public static toTypeOrm(piece: Piece): PieceTypeORM {
        const pieceTypeOrm: PieceTypeORM = new PieceTypeORM();
        pieceTypeOrm.id = piece.getId().getValue();
        pieceTypeOrm.name = piece.getName();
        pieceTypeOrm.length = piece.getLength();
        pieceTypeOrm.height = piece.getHeight();
        return pieceTypeOrm;
    }
}