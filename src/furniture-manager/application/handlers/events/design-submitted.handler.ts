import { CommandBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { FurnitureState } from "src/furniture-design/domain/enums/furnitureState.enum";
import { DesignSubmittedEvent } from "src/furniture-manager/domain/events/design-submitted.event";
import { PublishDesignCommand } from "../../commands/publish-design.command";

@EventsHandler(DesignSubmittedEvent)
export class DesignSubmittedHandler implements IEventHandler<DesignSubmittedEvent> {

    constructor (
        private commandBus: CommandBus
    ){}

    async handle(event: DesignSubmittedEvent) {
        const publishDesignCommand: PublishDesignCommand = new PublishDesignCommand(
            event.id,
            FurnitureState.PUBLISHED
        );
        return await this.commandBus.execute(publishDesignCommand);
    }
    
}