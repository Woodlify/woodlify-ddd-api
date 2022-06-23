import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatedDesignEvent } from "src/furniture-design/domain/events/created-design.event";
@EventsHandler(CreatedDesignEvent)
export class CreatedDesignHandler implements IEventHandler<CreatedDesignEvent> {
    constructor () {}
    async handle(event: CreatedDesignEvent) {
        console.log("Design has been created");
    }
}