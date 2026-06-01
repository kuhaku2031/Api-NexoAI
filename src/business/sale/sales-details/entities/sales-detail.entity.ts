import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';

@Entity()
export class SalesDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  selling_price: number;

  @Column()
  sale_id: number;

  @ManyToOne(() => Sale, (sale) => sale.salesDetail)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @Column({ type: 'jsonb' })
  product: any;
}
