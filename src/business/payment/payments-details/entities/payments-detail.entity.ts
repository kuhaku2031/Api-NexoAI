import { Payment } from 'src/business/payment/payments/entities/payment.entity';
import { PaymentsMethod } from 'src/business/payment/payments-methods/entities/payments-method.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentsDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payment_method_id: number;

  @ManyToOne(() => PaymentsMethod)
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentsMethod;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_amount: number;

  @Column()
  payment_id: number;

  @ManyToOne(() => Payment, (payment) => payment.paymentsDetail)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;
}
