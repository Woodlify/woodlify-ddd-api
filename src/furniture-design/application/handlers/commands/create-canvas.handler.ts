import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { CanvasTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/canvas.typeorm";
import { CreateCanvasCommand } from "../../commands/create-canvas.command";
import { Repository } from "typeorm";
import { CanvasMapper } from "../../mappers/canvas.mapper";
import { Canvas } from "src/furniture-design/domain/entities/canvas.entity";
import { CanvasFactory } from "src/furniture-design/domain/factories/canvas.factory";
import { CanvasId } from "src/furniture-design/domain/value-objects/canvas-id.value";

@CommandHandler(CreateCanvasCommand)
export class CreateCanvasHandlder implements ICommandHandler<CreateCanvasCommand> {
    constructor (
        @InjectRepository(CanvasTypeORM)
        private _companyRepository: Repository<CanvasTypeORM>,
        private publisher: EventPublisher
    ) {}

    async execute(command: CreateCanvasCommand): Promise<any> {
        let canvasId: number = 0;
        let canvas: Canvas = CanvasFactory.createFrom(command.name, command.createdAt, command.lastMofication);
        let canvasTypeorm: CanvasTypeORM = CanvasMapper.toTypeOrm(canvas);
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