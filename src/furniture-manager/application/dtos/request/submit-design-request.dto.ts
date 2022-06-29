import { ApiProperty } from '@nestjs/swagger';
import { FurnitureState } from 'src/furniture-design/domain/enums/furnitureState.enum';
import { CanvasId } from 'src/furniture-design/domain/value-objects/canvas-id.value';


export class SubmitDesignRequest {
  @ApiProperty()
  public readonly id: number;
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly status: FurnitureState;
  constructor(
    id: number,
    name: string,
    status: FurnitureState
  ) {
    this.id= id;
    this.name = name;
    this.status = status;
  }
}