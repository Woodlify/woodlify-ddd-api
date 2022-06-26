import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app-notification";
import { FurnitureTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { Repository } from "typeorm";
import { CreateFurnitureManagerRequest } from "../dtos/request/create-furniture-manager-request.dto";
import { SubmitDesignRequest } from "../dtos/request/submit-design-request.dto";

@Injectable()
export class CreateFurnitureManagerValidator {
    constructor(
    ) {}
    public async validate(
        createFurnitureManagerRequest: CreateFurnitureManagerRequest
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();
        if (createFurnitureManagerRequest.furnitures.length <= 0)
            notification.addError("Not furnituresEnough",null);
        return notification;
    }
}