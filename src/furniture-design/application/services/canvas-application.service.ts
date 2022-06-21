import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app-notification";
import { DateTime } from "src/common/domain/value-objects/date-time.value";
import { Result } from "typescript-result";
import { CreateCanvasCommand } from "../commands/create-canvas.command";
import { RegisterCanvasRequest } from "../dtos/request/register-canvas-request.dto";
import { RegisterCanvasResponse } from "../dtos/response/register-canvas-response.dto";
import { RegisterCanvasValidator } from "../validators/create-canvas.validator";

@Injectable()
export class CanvasApplicationService {

    constructor(
        private _commandBus: CommandBus,
        private _registerCanvasValidator: RegisterCanvasValidator
    ) {}

    async register(
        registerCanvasRequest: RegisterCanvasRequest
    ): Promise<Result<AppNotification, RegisterCanvasResponse>> {
        const notification: AppNotification = await this._registerCanvasValidator.validate(registerCanvasRequest);
        if(notification.hasErrors())
            return Result.error(notification);
        const createdAt: Date = new Date(DateTime.utcNow().format());
        const createCanvas: CreateCanvasCommand = new CreateCanvasCommand(
            registerCanvasRequest.name,
            createdAt,
            registerCanvasRequest.lastModification
        );
        const canvasId = await this._commandBus.execute(createCanvas);
        const registerCanvasResponse: RegisterCanvasResponse = new RegisterCanvasResponse(
            canvasId,
            registerCanvasRequest.name,
            createdAt,
            registerCanvasRequest.lastModification
        );
        return Result.ok(registerCanvasResponse);
    }

}