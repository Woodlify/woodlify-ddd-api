import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app-notification";
import { CanvasTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/canvas.typeorm";
import { FurnitureTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { Repository } from "typeorm";
import { RegisterFurnitureRequest } from "../dtos/request/register-furniture-request.dto";

@Injectable()
export class RegisterDesignValidator {
    constructor (
        @InjectRepository(FurnitureTypeorm)
        private _furnitureRepository: Repository<CanvasTypeorm>

    ) {}

    public async validate(
        createDesignRequest: RegisterFurnitureRequest
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();
        const canvas = this._furnitureRepository.createQueryBuilder().where("id = :id", { id: createDesignRequest.canvasId.getCanvasId()}).getOne();
        if(canvas != null)
            notification.addError("canvas is taken", null);
        if(createDesignRequest.name.length > 50)
            notification.addError("Furniture design name length exceeded", null);
        if( createDesignRequest.pieces.length >= 0)
            notification.addError("Not enough pieces to save de furniture", null);
        return notification;
    }
}