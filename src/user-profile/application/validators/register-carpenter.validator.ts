import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app-notification';
import { Repository } from 'typeorm';
import { UserTypeORM } from '../../infrastructure/persistence/typeorm/entities/user.typeorm';
import { CarpenterTypeORM } from '../../infrastructure/persistence/typeorm/entities/carpenter.typeorm';
import { RegisterCarpenterRequestDto } from '../dtos/request/register-carpenter-request.dto';

@Injectable()
export class RegisterCarpenterValidator {
  constructor(
    @InjectRepository(CarpenterTypeORM)
    private carpenterRepository: Repository<CarpenterTypeORM>,
  ) {
  }

  public async validate(
    registerCarpenterRequest: RegisterCarpenterRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const name: string = registerCarpenterRequest.carpenterName.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    const username: string = registerCarpenterRequest.username.trim();
    if (username.length <= 0) {
      notification.addError('username is required', null);
    }
    const email: string = registerCarpenterRequest.email.trim();
    if (email.length <= 0) {
      notification.addError('email is required', null);
    }
    const password: string = registerCarpenterRequest.password.trim();
    if (password.length <= 0) {
      notification.addError('password is required', null);
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
