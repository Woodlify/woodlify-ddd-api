import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app-notification';
import { Result } from 'typescript-result';
import { RegisterCarpenterValidator } from '../validators/register-carpenter.validator';
import { RegisterCarpenter } from '../commands/register-carpenter.command';
import { RegisterCarpenterRequestDto } from '../dtos/request/register-carpenter-request.dto';
import { RegisterCarpenterResponse } from '../dtos/response/register-carpenter-response.dto';

@Injectable()
export class CarpenterApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerCarpenterValidator: RegisterCarpenterValidator,
  ) {}

  async register(
    registerCarpenterRequest: RegisterCarpenterRequestDto,
  ): Promise<Result<AppNotification, RegisterCarpenterResponse>> {
    const notification: AppNotification =
      await this.registerCarpenterValidator.validate(registerCarpenterRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerCarpenter: RegisterCarpenter = new RegisterCarpenter(
      registerCarpenterRequest.carpenterName,
      registerCarpenterRequest.ruc,
      registerCarpenterRequest.email,
      registerCarpenterRequest.username,
      registerCarpenterRequest.password,
    );
    const userId = await this.commandBus.execute(registerCarpenter);
    const registerCarpenterResponse: RegisterCarpenterResponse =
      new RegisterCarpenterResponse(
        userId,
        registerCarpenterRequest.carpenterName,
        registerCarpenterRequest.ruc,
        registerCarpenterRequest.email,
        registerCarpenterRequest.username,
        registerCarpenterRequest.password,
      );
    console.log(userId);
    return Result.ok(registerCarpenterResponse);
  }
}
