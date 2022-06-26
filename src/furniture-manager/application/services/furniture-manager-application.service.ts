import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app-notification";
import { CreateDesignCommand } from "src/furniture-design/application/commands/create-desing.command";
import { Result } from "typescript-result";
import { CreateFurnitureManagerCommand } from "../commands/create-furniture-manager.command";
import { SubmitDesignCommand } from "../commands/submit-design.command";
import { CreateFurnitureManagerRequest } from "../dtos/request/create-furniture-manager-request.dto";
import { SubmitDesignRequest } from "../dtos/request/submit-design-request.dto";
import { CreateFurnitureManagerResponse } from "../dtos/response/create-furniture-response.dto";
import { SubmitDesignResponse } from "../dtos/response/submit-design-response.dto";
import { CreateFurnitureManagerValidator } from "../validators/create-furniture-design.validator";

@Injectable()
export class FurnitureManagerApplicationService {
    constructor(
        private commandBus: CommandBus,
        private createFurnitureManagerValidator: CreateFurnitureManagerValidator
    ) {}

    public async register(
        createFurnitureManagerRequest: CreateFurnitureManagerRequest
    ): Promise<Result<AppNotification,CreateFurnitureManagerResponse>> {
        const notification: AppNotification = await this.createFurnitureManagerValidator.validate(createFurnitureManagerRequest);
        if(notification.hasErrors())
            return Result.error(notification);
        const createFurnitureManager: CreateFurnitureManagerCommand = new CreateFurnitureManagerCommand(
            createFurnitureManagerRequest.id,
            createFurnitureManagerRequest.name,
            createFurnitureManagerRequest.furnitures
        );

        const furnitureManagerId = await this.commandBus.execute(createFurnitureManager);
        if (furnitureManagerId == 0){
            notification.addError("Error in saving the furniture manager",null);
            return Result.error(notification);
        }
        const furnitureManagerCreatedResponse: CreateFurnitureManagerResponse = new CreateFurnitureManagerResponse(
            createFurnitureManagerRequest.id,
            createFurnitureManagerRequest.name,
            createFurnitureManagerRequest.furnitures
        )
        return Result.ok(furnitureManagerCreatedResponse);
    }

    public async submitDesign(
        submitDesignRequest: SubmitDesignRequest
    ): Promise<Result<AppNotification,SubmitDesignResponse>>{
        const notification: AppNotification = new AppNotification();
        const submitDesignCommand: SubmitDesignCommand = new SubmitDesignCommand(
            submitDesignRequest.id,
            submitDesignRequest.name,
            submitDesignRequest.status
        );
        const result = await this.commandBus.execute(submitDesignCommand);
        if(!result){
            notification.addError("Error in updating furniture state", null);
            return Result.error(notification);
        }
        const designSubmittedDto: SubmitDesignResponse = new SubmitDesignResponse(
            submitDesignRequest.id,
            submitDesignRequest.name,
            submitDesignRequest.status
        );
        return Result.ok(designSubmittedDto);
    }

}