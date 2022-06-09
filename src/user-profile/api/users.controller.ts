import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterCarpenterRequestDto } from '../application/dtos/request/register-carpenter-request.dto';
import { RegisterCarpenterResponse } from '../application/dtos/response/register-carpenter-response.dto';
import { CarpenterApplicationService } from '../application/services/carpenter-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app-notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersCarpenterQuery } from '../application/queries/get-users-carpenter.query';
import { CustomerApplicationService } from '../application/services/customer-application.service';
import { RegisterCustomerRequest } from '../application/dtos/request/register-customer-request.dto';
import { RegisterCustomerResponse } from '../application/dtos/response/register-customer-response.dto';
import { GetUsersCustomerQuery } from '../application/queries/get-users-customer.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly carpenterApplicationService: CarpenterApplicationService,
    private readonly customerApplicationService: CustomerApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/customer')
  async registerCustomer(
    @Body() registerCustomerRequest: RegisterCustomerRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCustomerResponse> = await this.customerApplicationService.register(registerCustomerRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/carpenter')
  async registerCarpenter(
    @Body() registerCarpenterRequest: RegisterCarpenterRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCarpenterResponse> =
        await this.carpenterApplicationService.register(
          registerCarpenterRequest,
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/customer')
  async getCustomersPerson(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetUsersCustomerQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/carpenter')
  async getCustomersCompany(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const carpenters = await this.queryBus.execute(new GetUsersCarpenterQuery());
      return ApiController.ok(response, carpenters);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}