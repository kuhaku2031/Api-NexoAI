import { SubscriptionPlan } from "../../suscription-plans/entities/suscription-plan.entity";
import { SubscriptionUsage } from "../../suscription-usage/entities/suscription-usage.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum SubscriptionStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  SUSPENDED = 'suspended'
}

export enum BillingCycle {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_id: string;

  // @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'company_id' })
  // company: Company;

  @Column()
  plan_id: string;

  @ManyToOne(() => SubscriptionPlan)
  @JoinColumn({ name: 'plan_id' })
  plan: SubscriptionPlan;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.TRIAL
  })
  status: SubscriptionStatus;

  @Column({
    type: 'enum',
    enum: BillingCycle,
    default: BillingCycle.MONTHLY
  })
  billing_cycle: BillingCycle;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  trial_start: Date;

  @Column()
  trial_end: Date;

  @Column()
  current_period_start: Date;

  @Column()
  current_period_end: Date;

  @Column({ nullable: true })
  canceled_at: Date;

  @Column({ nullable: true })
  ends_at: Date; // Para cancelaciones al final del período

  @Column({ default: 0 })
  days_until_due: number; // Días de gracia antes de suspender

  // Información de pago
  @Column({ nullable: true })
  payment_method_id: string; // ID del método de pago en Stripe/PayU

  @Column({ nullable: true })
  stripe_subscription_id: string; // ID en Stripe

  @Column({ nullable: true })
  last_payment_date: Date;

  @Column({ nullable: true })
  next_payment_date: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>; // Info adicional

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => SubscriptionUsage, usage => usage.subscription)
  usage_records: SubscriptionUsage[];
}