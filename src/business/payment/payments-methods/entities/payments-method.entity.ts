import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentsMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  method_name: string;
}
