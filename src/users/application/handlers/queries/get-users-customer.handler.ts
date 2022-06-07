import { GetUsersCustomerQuery } from '../../queries/get-users-customer.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetUsersCustomerDto } from '../../dtos/queries/get-users-customer.dto';

@QueryHandler(GetUsersCustomerDto)
export class GetUsersCustomerHandler implements IQueryHandler<GetUsersCustomerQuery> {
  constructor() {}

  async execute(query: GetUsersCustomerQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      name as customerName,
    FROM 
      customers
    ORDER BY
      name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetUsersCustomerDto[] = ormCustomers.map(function (ormCustomer) {
      const customerDto = new GetUsersCustomerDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.customerName = ormCustomer.name;
      return customerDto;
    });
    return customers;
  }
}