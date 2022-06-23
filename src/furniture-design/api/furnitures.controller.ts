import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app-notification";
import { Result } from "typescript-result";
import { ModifyDesignRequest } from "../application/dtos/request/modify-design-request";
import { RegisterFurnitureRequest } from "../application/dtos/request/register-furniture-request.dto";
import { ModifyDesignResponse } from "../application/dtos/response/modify-design-response";
import { RegisterFurnitureResponse } from "../application/dtos/response/register-furniture-response.dto";
import { GetFurnitureByIdQuery } from "../application/queries/get-furniture-by-id.query";
import { GetFurnituresQuery } from "../application/queries/get-furnitures.query";
import { FurnitureApplicationService } from "../application/services/furniture-application.service";

@Controller("furnitures")
export class FurnituresController {
    constructor(
        private readonly furnituresApplicationService: FurnitureApplicationService,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    async register (
        @Body() registerurnitureRequest: RegisterFurnitureRequest,
        @Res({ passthrough: true }) response
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterFurnitureResponse> = await this.furnituresApplicationService.register(registerurnitureRequest);
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
            const furnitures = await this.queryBus.execute(new GetFurnituresQuery());
            return ApiController.ok(response, furnitures);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get("/:id")
    async getById(@Param("id") furnitureId: number,  @Res({ passthrough: true }) response): Promise<object> {
        try {
            const furniture = await this.queryBus.execute(new GetFurnitureByIdQuery(furnitureId));
            return ApiController.ok(response, furniture);
        } catch (error) {
            return ApiController.serverError(response, error);
        }

    }

    @Put()
    async modifyDesign(
        @Body() modifyFurnitureRequest: ModifyDesignRequest, 
        @Res({ passthrough: true }) response
    ): Promise<object> {
        try {
            const result: Result<AppNotification, ModifyDesignResponse> = await this.furnituresApplicationService.update(modifyFurnitureRequest);
            if(result.isSuccess())
                return ApiController.ok(response, result.value);
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response,error);
        }
    }
}