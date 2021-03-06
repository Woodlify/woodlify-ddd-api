import { Column } from 'typeorm';

export class RucTypeORM {
  @Column('varchar', { name: 'ruc', length: 100, nullable: true })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): RucTypeORM {
    return new RucTypeORM(value);
  }
}