import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app-notification";
import { DateTime } from "src/common/domain/value-objects/date-time.value";
import { Result } from "typescript-result";
import { CreateDesignCommand } from "../commands/create-desing.command";
import { ModifyDesignCommand } from "../commands/modify-design.command";
import { ModifyDesignRequest } from "../dtos/request/modify-design-request";
import { RegisterFurnitureRequest } from "../dtos/request/register-furniture-request.dto";
import { ModifyDesignResponse } from "../dtos/response/modify-design-response";
import { RegisterFurnitureResponse } from "../dtos/response/register-furniture-response.dto";
import { RegisterDesignValidator } from "../validators/create-design.validator";
import { ModifyDesignValidator } from "../validators/modify-design.validator";

@Injectable()
export class FurnitureApplicationService {

    constructor(
        private _commandBus: CommandBus,
        private _registerDesignValidator: RegisterDesignValidator,
        private _modifyDesignValidator: ModifyDesignValidator
    ) {}

    async register(
        registerDesignRequest: RegisterFurnitureRequest
    ): Promise<Result<AppNotification,RegisterFurnitureResponse>> {
        const notification: AppNotification = await this._registerDesignValidator.validate(registerDesignRequest);
        if( notification.hasErrors() )
            return Result.error(notification);
        const createDesign: CreateDesignCommand = new CreateDesignCommand(
            registerDesignRequest.name,
            registerDesignRequest.pieces,
            registerDesignRequest.designDate,
            registerDesignRequest.lastModificationDate,
            registerDesignRequest.canvasId
        );
        const furnitureId = await this._commandBus.execute(createDesign);
        const registerFurnitureResponse: RegisterFurnitureResponse = new RegisterFurnitureResponse(
            furnitureId,
            registerDesignRequest.name,
            registerDesignRequest.pieces,
            registerDesignRequest.designDate,
            registerDesignRequest.lastModificationDate,
            registerDesignRequest.canvasId
        );
        return Result.ok(registerFurnitureResponse);
    }

    async update(
        modifyDesignRequest: ModifyDesignRequest
    ): Promise<Result<AppNotification,RegisterFurnitureResponse>> {
        const notification: AppNotification = await this._modifyDesignValidator.validate(modifyDesignRequest);
        if( notification.hasErrors() )
            return Result.error(notification);
        const modifyDesign: ModifyDesignCommand = new ModifyDesignCommand(
            modifyDesignRequest.id,
            modifyDesignRequest.name,
            modifyDesignRequest.pieces,
            modifyDesignRequest.designDate,
            modifyDesignRequest.lastModificationDate,
            modifyDesignRequest.canvasId
        );
        const furnitureId = await this._commandBus.execute(modifyDesign);
        const modifyFurnitureResponse: ModifyDesignResponse = new ModifyDesignResponse(
            furnitureId,
            modifyDesignRequest.name,
            modifyDesign.pieces,
            modifyDesign.designDate,
            new Date(DateTime.utcNow().format()),
            modifyDesignRequest.canvasId
        );
        return Result.ok(modifyFurnitureResponse);
    }
}