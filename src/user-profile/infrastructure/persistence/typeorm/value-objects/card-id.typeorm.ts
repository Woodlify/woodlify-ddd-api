import { Column } from 'typeorm';

export class CardIdTypeorm {
  @Column('int', { name: 'cards_id', nullable: true })
  value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): CardIdTypeorm {
    return new CardIdTypeorm(value);
  }
}