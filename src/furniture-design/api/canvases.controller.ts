import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app-notification";
import { Result } from "typescript-result";
import { RegisterCanvasRequest } from "../application/dtos/request/register-canvas-request.dto";
import { RegisterCanvasResponse } from "../application/dtos/response/register-canvas-response.dto";
import { GetCanvasByIdQuery } from "../application/queries/get-canvas-by-id.query";
import { GetCanvasQuery } from "../application/queries/get-canvas.query";
import { CanvasApplicationService } from "../application/services/canvas-application.service";

@Controller("canvases")
export class CanvasesController {
    constructor (
        private readonly canvasesApplicationService: CanvasApplicationService,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    async register(
        @Body() registerCanvasRequest: RegisterCanvasRequest,
        @Res({ passthrough: true }) response
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterCanvasResponse> = await this.canvasesApplicationService.register(registerCanvasRequest);
            if (result.isSuccess())
                return ApiController.created(response, result.value);
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response,error);
        }
    }

    @Get()
    async getCanvases(@Res({ passthrough: true }) response): Promise<object> {
        try {
            const canvases = await this.queryBus.execute(new GetCanvasQuery());
            return ApiController.ok(response, canvases);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get("/:id")
    async getCanvasById(@Param("id") canvasId: number, @Res({ passthrough: true }) response): Promise<object> {
        try {
            const canvas = await this.queryBus.execute(new GetCanvasByIdQuery(canvasId));
            return ApiController.ok(response, canvas);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }
}