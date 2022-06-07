import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { CarpenterApplicationService } from './application/services/carpenter-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterCustomerValidator } from './application/validators/register-customer.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCarpenterHandler } from './application/handlers/commands/register-carpenter.handler';
import { CustomerRegisteredHandler } from './application/handlers/events/customer-registered.handler';
import { GetUsersCustomerHandler } from './application/handlers/queries/get-users-customer.handler';
import { CustomerApplicationService } from './application/services/customer-application.service';
import { RegisterCarpenterValidator } from './application/validators/register-carpenter.validator';
import { RegisterCustomerHandler } from './application/handlers/commands/register-customer.handler';
import { CarpenterTypeORM } from './infrastructure/persistence/typeorm/entities/carpenter.typeorm';
import { CustomerTypeORM } from './infrastructure/persistence/typeorm/entities/customer.typeorm';
import { UserTypeORM } from './infrastructure/persistence/typeorm/entities/user.typeorm';
import { CarpenterRegisteredHandler } from './application/handlers/events/carpenter-registered.handler';
import { GetUsersCarpenterHandler } from './application/handlers/queries/get-users-carpenter.handler';

export const CommandHandlers = [
  RegisterCarpenterHandler,
  RegisterCustomerHandler,
];
export const EventHandlers = [
  CustomerRegisteredHandler,
  CarpenterRegisteredHandler,
];
export const QueryHandlers = [
  GetUsersCustomerHandler,
  GetUsersCarpenterHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CarpenterTypeORM, CustomerTypeORM, UserTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [
    CustomerApplicationService,
    CarpenterApplicationService,
    RegisterCustomerValidator,
    RegisterCarpenterValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClientsModule {}