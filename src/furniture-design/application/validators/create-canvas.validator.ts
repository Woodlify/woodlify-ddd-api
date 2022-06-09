import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app-notification";
import { CanvasTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/entities/canvas.typeorm";
import { Repository } from "typeorm";
import { RegisterCanvasRequest } from "../dtos/request/register-canvas-request.dto";

@Injectable()
export class RegisterCanvasValidator {
    constructor(
        @InjectRepository(CanvasTypeorm)
        private _canvasRepository: Repository<CanvasTypeorm>
    ) {}

    public async validate(
        createCanvasRequest: RegisterCanvasRequest
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();
        const name: string = createCanvasRequest.name.trim();
        if (createCanvasRequest.name.length > 50)
            notification.addError("Maximum name length exceeded", null);
        if(notification.hasErrors())
            return notification;
        return notification;
    }
}