import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from '../../suscription/entities/suscription.entity';

export enum UsageType {
  AI_QUERIES = 'ai_queries',
  USERS = 'users',
  POINTS_OF_SALE = 'points_of_sale',
  API_CALLS = 'api_calls',
}

@Entity()
export class SubscriptionUsage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subscription_id: string;

  @ManyToOne(() => Subscription, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @Column({
    type: 'enum',
    enum: UsageType,
  })
  usage_type: UsageType;

  @Column()
  usage_count: number;

  @Column()
  period_start: Date;

  @Column()
  period_end: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
