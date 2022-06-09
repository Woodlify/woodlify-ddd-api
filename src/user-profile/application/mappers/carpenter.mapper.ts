import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { Carpenter } from '../../domain/entities/carpenter.entity';
import { CarpenterTypeORM } from '../../infrastructure/persistence/typeorm/entities/carpenter.typeorm';
import { CarpenterNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/carpenter-name.typeorm';
import { AccountTypeORM } from '../../infrastructure/persistence/typeorm/entities/account.typeorm';

export class CarpenterMapper {
  public static toTypeORM(carpenter: Carpenter): CarpenterTypeORM {
    const carpenterTypeORM: CarpenterTypeORM = new CarpenterTypeORM();
    carpenterTypeORM.name = CarpenterNameTypeORM.from(
      carpenter.getName().getValue(),
    );
    carpenterTypeORM.ruc = RucTypeORM.from(carpenter.getRuc().getValue());
    carpenterTypeORM.account = AccountTypeORM.from(
      carpenter.getAccount().getUsername(),
      carpenter.getAccount().getPassword(),
      carpenter.getAccount().getEmail(),
    );
    return carpenterTypeORM;
  }
}
