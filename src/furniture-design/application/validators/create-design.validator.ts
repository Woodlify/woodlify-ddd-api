import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app-notification";
import { CanvasTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/canvas.typeorm";
import { FurnitureTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { Repository } from "typeorm";
import { RegisterFurnitureRequest } from "../dtos/request/register-furniture-request.dto";

@Injectable()
export class RegisterDesignValidator {
    constructor (
        @InjectRepository(FurnitureTypeORM)
        private _furnitureRepository: Repository<CanvasTypeORM>

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