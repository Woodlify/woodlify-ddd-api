import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app-notification';
import { Result } from 'typescript-result';
import { RegisterCustomerValidator } from '../validators/register-customer.validator';
import { RegisterCustomer } from '../commands/register-customer.command';
import { RegisterCustomerRequest } from '../dtos/request/register-customer-request.dto';
import { RegisterCustomerResponse } from '../dtos/response/register-customer-response.dto';

@Injectable()
export class CustomerApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerCustomerValidator: RegisterCustomerValidator,
  ) {}

  async register(
    registerCustomerRequest: RegisterCustomerRequest,
  ): Promise<Result<AppNotification, RegisterCustomerResponse>> {
    const notification: AppNotification =
      await this.registerCustomerValidator.validate(registerCustomerRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerCustomer: RegisterCustomer = new RegisterCustomer(
      registerCustomerRequest.customerName,
      registerCustomerRequest.email,
      registerCustomerRequest.username,
      registerCustomerRequest.password,
    );
    const userId = await this.commandBus.execute(registerCustomer);
    const registerCustomerResponse: RegisterCustomerResponse =
      new RegisterCustomerResponse(
        userId,
        registerCustomerRequest.customerName,
        registerCustomerRequest.email,
        registerCustomerRequest.username,
        registerCustomerRequest.password,
      );
    return Result.ok(registerCustomerResponse);
  }
}
