import { Injectable } from "@nestjs/common";
import { AppNotification } from "src/common/application/app-notification";
import { CreateFurnitureManagerRequest } from "../dtos/request/create-furniture-manager-request.dto";

@Injectable()
export class CreateFurnitureManagerValidator {
    constructor(
    ) {}
    public async validate(
        createFurnitureManagerRequest: CreateFurnitureManagerRequest
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();
        if (createFurnitureManagerRequest.furnitures.length < 0)
            notification.addError("Not furnituresEnough",null);
        return notification;
    }
}