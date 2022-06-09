import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountTypeORM } from './account.typeorm';
@Entity('users')
export abstract class UserTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column((type) => AccountTypeORM, { prefix: false })
  public account: AccountTypeORM;
}
