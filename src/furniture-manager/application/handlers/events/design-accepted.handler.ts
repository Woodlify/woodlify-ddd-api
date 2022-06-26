import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DesignAcceptedEvent } from "src/furniture-manager/domain/events/design-accepted.event";

@EventsHandler(DesignAcceptedEvent)
export class DesignAcceptedEventHandler implements IEventHandler<DesignAcceptedEvent> {
    constructor() {}

    async handle(event: DesignAcceptedEvent) {
       console.log("Design Accepted");
    }
    
}