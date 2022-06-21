import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { CanvasTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/entities/canvas.typeorm";
import { CreateCanvasCommand } from "../../commands/create-canvas.command";
import { Repository } from "typeorm";
import { CanvasFactory } from "src/FurnitureDesign/domain/factories/canvas.factory";
import { Canvas } from "src/FurnitureDesign/domain/entities/canvas.entity";
import { CanvasMapper } from "../../mappers/canvas.mapper";
import { CanvasId } from "src/FurnitureDesign/domain/value-objects/canvas-id.value";

@CommandHandler(CreateCanvasCommand)
export class CreateCanvasHandlder implements ICommandHandler<CreateCanvasCommand> {
    constructor (
        @InjectRepository(CanvasTypeorm)
        private _companyRepository: Repository<CanvasTypeorm>,
        private publisher: EventPublisher
    ) {}

    async execute(command: CreateCanvasCommand): Promise<any> {
        let canvasId: number = 0;
        let canvas: Canvas = CanvasFactory.createFrom(command.name, command.createdAt, command.lastMofication);
        let canvasTypeorm: CanvasTypeorm = CanvasMapper.toTypeOrm(canvas);
        canvasTypeorm = await this._companyRepository.save(canvasTypeorm);
        if(canvasTypeorm == null)
            return canvasId;
        canvasId = Number(canvasTypeorm.id);
        canvas.changeId(CanvasId.create(canvasId));
        canvas = this.publisher.mergeObjectContext(canvas);
        canvas.register();
        canvas.commit();
        return canvasId;
    }
}