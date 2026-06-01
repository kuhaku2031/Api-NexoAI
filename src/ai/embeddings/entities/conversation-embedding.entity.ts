import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('conversation_embeddings')
@Index(['company_id'])
@Index(['created_at'])
export class ConversationEmbedding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_id: string;

  @Column()
  conversation_id: string;

  @Column('text')
  content: string;

  @Column('vector', { length: 768 })
  embedding: number[];

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  summary: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
