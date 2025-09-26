import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subscription } from "../../suscription/entities/suscription.entity";

export enum PlanType {
  STARTER = 'starter',
  PROFESSIONAL = 'professional', 
  ENTERPRISE = 'enterprise'
}

@Entity()
export class SubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PlanType,
    unique: true
  })
  plan_type: PlanType;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthly_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  yearly_price: number; // Con descuento anual

  @Column()
  description: string;

  // Límites del plan
  @Column()
  max_points_of_sale: number; // -1 para ilimitado

  @Column()
  max_users: number; // -1 para ilimitado

  @Column()
  ai_queries_per_month: number; // -1 para ilimitado

  @Column({ default: false })
  has_advanced_analytics: boolean;

  @Column({ default: false })
  has_api_access: boolean;

  @Column({ default: false })
  has_white_label: boolean;

  @Column({ default: false })
  has_custom_integrations: boolean;

  @Column({ default: false })
  has_priority_support: boolean;

  @Column({ default: false })
  has_phone_support: boolean;

  @Column({ default: false })
  has_predictive_analytics: boolean;

  @Column({ type: 'jsonb', nullable: true })
  features: Record<string, any>; // Features adicionales flexibles

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Subscription, subscription => subscription.plan)
  subscriptions: Subscription[];
}