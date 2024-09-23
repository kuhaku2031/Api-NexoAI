import { Payment } from 'src/payments/entities/payment.entity';
import { PointSale } from 'src/point-sale/entities/point-sale.entity';
import { SalesDetail } from 'src/sales-details/entities/sales-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  sale_id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  discount: number;

  @ManyToOne(() => PointSale, (pointSale) => pointSale.sales)
  @JoinColumn({ name: 'point_sale_id' })
  point_sale: PointSale;

  @Column({ nullable: false })
  total_amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sale_date: Date;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  product: any[];

  @OneToMany(() => SalesDetail, (salesDetail) => salesDetail.sale)
  salesDetail: SalesDetail[];

  @OneToOne(() => Payment, (payment) => payment.sale_id)
  payment: Payment;
}
