import { Company } from 'src/core/companies/entities/company.entity';
import { Users } from 'src/core/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from 'src/common/enum/status.enum';

@Entity()
export class WorkSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (users) => users.work_sessions)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Company, (company) => company.work_sessions)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'timestamp', nullable: true })
  check_in: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out: Date | null;

  @Column({ type: 'enum', enum: Status, default: Status.INACTIVE })
  status: Status;

  @Column({ default: 0 })
  total_time: number;
}
