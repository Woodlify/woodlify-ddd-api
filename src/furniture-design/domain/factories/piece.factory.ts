import { Piece } from '../entities/piece.entity';
import { PieceId } from '../value-objects/piece-id.value';
import { FurnitureId } from "../value-objects/furniture-id.value";

export class PieceFactory {
  public static createFrom(
    length: number,
    height: number,
    width: number,
    name: string
  ): Piece {
    return new Piece(
      PieceId.create(0),
      length,
      height,
      width,
      name,
      FurnitureId.create(0),
    );
  }

  public static createWithId(
    PieceId: PieceId,
    length: number,
    height: number,
    width: number,
    name: string,
  ): Piece {
    return new Piece(
      PieceId,
      length,
      height,
      width,
      name,
      FurnitureId.create(0),
    );
  }
}