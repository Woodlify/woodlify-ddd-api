import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { PieceTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/entities/piece.typeorm";

export class PieceMapper {
    public static toTypeOrm(piece: Piece): PieceTypeorm {
        const pieceTypeOrm: PieceTypeorm = new PieceTypeorm();
        pieceTypeOrm.id = piece.getId().getValue();
        pieceTypeOrm.name = piece.getName();
        pieceTypeOrm.length = piece.getLength();
        pieceTypeOrm.height = piece.getHeight();
        return pieceTypeOrm;
    }
}