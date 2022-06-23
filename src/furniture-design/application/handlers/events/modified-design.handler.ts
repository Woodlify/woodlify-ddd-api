import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ModifiedDesignEvent } from "src/furniture-design/domain/events/modified-design.event";

@EventsHandler(ModifiedDesignEvent)
export class ModifiedDesignHandler implements IEventHandler<ModifiedDesignEvent> {
    constructor () {}
    async handle(event: ModifiedDesignEvent) {
        console.log("The furniture has been modified");
    }
}