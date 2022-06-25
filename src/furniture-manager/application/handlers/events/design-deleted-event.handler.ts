import { EventsHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletedDesignEvent } from "src/furniture-manager/domain/events/design-deleted.event";

@EventsHandler(DeletedDesignEvent)
export class DesignDeletedHandler implements ICommandHandler<DeletedDesignEvent> {

    constructor (

    ) {}
    async execute(command: DeletedDesignEvent): Promise<any> {
        console.log("Design Deleted");
    }
}