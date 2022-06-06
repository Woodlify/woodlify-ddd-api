import { Column, Entity } from 'typeorm';
import { UserTypeORM } from './user.typeorm';
import { CustomerNameTypeORM } from '../value-objects/customer-name.typeorm';

@Entity('customers')
export class CustomerTypeORM extends UserTypeORM {
  @Column((type) => CustomerNameTypeORM, { prefix: false })
  public name: CustomerNameTypeORM;
}
