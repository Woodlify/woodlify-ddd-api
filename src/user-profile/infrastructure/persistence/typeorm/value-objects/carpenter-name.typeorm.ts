import { Column } from 'typeorm';

export class CarpenterNameTypeORM {
  @Column('varchar', { name: 'name', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): CarpenterNameTypeORM {
    return new CarpenterNameTypeORM(name);
  }
}