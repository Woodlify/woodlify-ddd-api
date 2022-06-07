import { GetUsersCarpenterQuery } from '../../queries/get-users-carpenter.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetUsersCarpenterDto } from '../../dtos/queries/get-users-carpenter.dto';

@QueryHandler(GetUsersCarpenterDto)
export class GetUsersCarpenterHandler implements IQueryHandler<GetUsersCarpenterQuery> {
  constructor() {}

  async execute(query: GetUsersCarpenterQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      name as carpenterName,
      ruc
    FROM 
      carpenters
    ORDER BY
      name;`;
    const ormCarpenters = await manager.query(sql);
    if (ormCarpenters.length <= 0) {
      return [];
    }
    const carpenters: GetUsersCarpenterDto[] = ormCarpenters.map(function (
      ormCarpenter,
    ) {
      const carpenterDto = new GetUsersCarpenterDto();
      carpenterDto.id = Number(ormCarpenter.id);
      carpenterDto.carpenterName = ormCarpenter.carpenterName;
      carpenterDto.ruc = ormCarpenter.ruc;
      return carpenterDto;
    });
    return carpenters;
  }
}