import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app-notification";
import { FurnitureTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { Repository } from "typeorm";
import { ModifyDesignRequest } from "../dtos/request/modify-design-request";

@Injectable()
export class ModifyDesignValidator {
    constructor (
        @InjectRepository(FurnitureTypeorm)
        private _furnitureRepository: Repository<FurnitureTypeorm>
    ) {}

    public async validate (
        modifyDesignRequest: ModifyDesignRequest
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();
        const canvas = this._furnitureRepository.createQueryBuilder().where("id = :id", {id: modifyDesignRequest.id }).getOne();
        if( canvas === null )
            notification.addError("Furniture doesn't exist", null);
        if(modifyDesignRequest.name.length > 50)
            notification.addError("Furniture design name length exceeded", null);
        if( modifyDesignRequest.pieces.length >= 0)
            notification.addError("Not enough pieces to save de furniture", null);
        return notification;
    }

}