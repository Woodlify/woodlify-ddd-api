import { Column, Entity } from 'typeorm';
import { UserTypeORM } from './user.typeorm';
import { CarpenterNameTypeORM } from '../value-objects/carpenter-name.typeorm';
import { RucTypeORM } from '../value-objects/ruc.typeorm';

@Entity('carpenters')
export class CarpenterTypeORM extends UserTypeORM {
  @Column((type) => CarpenterNameTypeORM, { prefix: false })
  public name: CarpenterNameTypeORM;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;
}
