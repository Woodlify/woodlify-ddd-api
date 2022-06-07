import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app-notification';
import { Repository } from 'typeorm';
import { UserTypeORM } from '../../infrastructure/persistence/typeorm/entities/user.typeorm';
import { CarpenterTypeORM } from '../../infrastructure/persistence/typeorm/entities/carpenter.typeorm';
import { RegisterCarpenterRequest } from '../dtos/request/register-carpenter-request';

@Injectable()
export class RegisterCarpenterValidator {
  constructor(
    @InjectRepository(CarpenterTypeORM)
    private carpenterRepository: Repository<CarpenterTypeORM>,
  ) {
  }

  public async validate(
    registerCarpenterRequest: RegisterCarpenterRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const name: string = registerCarpenterRequest.carpenterName.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    const ruc: string = registerCarpenterRequest.ruc.trim();
    if (ruc.length <= 0) {
      notification.addError('ruc is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: UserTypeORM = await this.carpenterRepository
      .createQueryBuilder()
      .where('ruc = :ruc', { ruc })
      .getOne();
    if (customer != null) {
      notification.addError('ruc is taken', null);
    }
    return notification;
  }
}