import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app-notification';
import { Repository } from 'typeorm';
import { UserTypeORM } from '../../infrastructure/persistence/typeorm/entities/user.typeorm';
import { CustomerTypeORM } from '../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { RegisterCustomerRequest } from '../dtos/request/register-customer-request.dto';

@Injectable()
export class RegisterCustomerValidator {
  constructor(
    @InjectRepository(CustomerTypeORM)
    private customerRepository: Repository<CustomerTypeORM>,
  ) {
  }

  public async validate(
    registerCustomerRequest: RegisterCustomerRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const name: string = registerCustomerRequest.customerName.trim();
    const username: string = registerCustomerRequest.username.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    if (username.length <= 0) {
      notification.addError('name is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: UserTypeORM = await this.customerRepository
      .createQueryBuilder()
      .where('username = :username', { username })
      .getOne();
    if (customer != null) {
      notification.addError('username is taken', null);
    }
    return notification;
  }
}