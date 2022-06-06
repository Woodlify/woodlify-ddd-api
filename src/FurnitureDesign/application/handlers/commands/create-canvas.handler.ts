import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { CanvasTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/canvas.typeorm";
import { CreateCanvasCommand } from "../../commands/create-canvas.command";
import { Repository } from "typeorm";

@CommandHandler(CreateCanvasCommand)
export class CreateCanvasHandlder implements ICommandHandler<CreateCanvasCommand> {
    constructor(
        @InjectRepository(CanvasTypeorm)
        private _companyRepository: Repository<CanvasTypeorm> ,
        private _publisher: EventPublisher
    ){}

    async execute(command: CreateCanvasCommand): Promise<any> {
        let canvasId: number = 0;
    }
}