import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { CreateFurnitureManagerRequest } from "../application/dtos/request/create-furniture-manager-request.dto";
import { SubmitDesignRequest } from "../application/dtos/request/submit-design-request.dto";
import { GetFurnitureManagerByIdQuery } from "../application/queries/get-furniture-manager-by-id.query";
import { GetFurnitureManagerQuery } from "../application/queries/get-furniture-manager.query";
import { FurnitureManagerApplicationService } from "../application/services/furniture-manager-application.service";
import { FurnitureManager } from "../domain/entities/furniture-manager.entity";

@Controller("furniture_managers")
export class FurnitureManagerController {
    constructor(
        private _furnitureManagerApplicationService: FurnitureManagerApplicationService,
        private _queryBus: QueryBus
    ) {}

    @Post()
    async createFurnitureManager(
        @Body() createFurnitureManagerRequest: CreateFurnitureManagerRequest,
        @Res({ passthrough: true }) response
    ): Promise<object> {
        try {
            const result = await this._furnitureManagerApplicationService.register(createFurnitureManagerRequest);
            if (result.isSuccess())
                return ApiController.created(response,result.value);
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get()
    async getFuritures(@Res({ passthrough: true }) response): Promise<any> {
        try {
            const furnitureManagers = await this._queryBus.execute(new GetFurnitureManagerQuery());
            return ApiController.ok(response, furnitureManagers);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get("/:id")
    async getById(@Param("id") furnitureManagerId: number,  @Res({ passthrough: true }) response): Promise<object> {
        try {
            const furnitureManager = await this._queryBus.execute(new GetFurnitureManagerByIdQuery(furnitureManagerId));
            return ApiController.ok(response, furnitureManager);
        } catch (error) {
            return ApiController.serverError(response, error);
        }

    }

    @Put("/:id/furnitures")
    async submitDesign(@Param("id") furnitureManagerId: number, @Body() submitDesignRequest: SubmitDesignRequest, @Res({ passthrough: true }) response): Promise<object> {
        try {
            let furnitureManager = await this._queryBus.execute(new GetFurnitureManagerByIdQuery(furnitureManagerId));
            if(furnitureManager.length <= 0)
                return ApiController.notFound(response);
            furnitureManager = furnitureManager[0];
            FurnitureManager.setInstance(furnitureManager.id,furnitureManager.name);
            const result = await this._furnitureManagerApplicationService.submitDesign(submitDesignRequest);
            if(result.isSuccess())
                return ApiController.ok(response, result.value);
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    
}