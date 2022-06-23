import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatedCanvasEvent } from "src/furniture-design/domain/events/created-canvas.event";
@EventsHandler(CreatedCanvasEvent)
export class CreatedCanvasHandler implements IEventHandler<CreatedCanvasEvent> {
    constructor () {}
    async handle (event: CreatedCanvasEvent) {
        console.log("Canvas has been created");
    }
}