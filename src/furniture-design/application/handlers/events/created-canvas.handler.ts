import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatedCanvasEvent } from "src/FurnitureDesign/domain/events/created-canvas.event";
import { CreateDesignCommand } from "../../commands/create-desing.command";

@EventsHandler(CreatedCanvasEvent)
export class CreatedCanvasHandler implements IEventHandler<CreatedCanvasEvent> {
    constructor () {}
    async handle (event: CreatedCanvasEvent) {
        console.log("Canvas has been created");
    }
}