import { UserRole } from 'src/common/enum/role.enum';
import { Company } from 'src/core/companies/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn()
  company_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hasheado

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ type: 'timestamp', nullable: true })
  refresh_token_expires: Date;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  // // Relaciones
  // //   @ManyToMany(() => PointSale, pointSale => pointSale.employees)
  // @Column()
  // pointSales: 'PointSale[]';

  // //   @OneToMany(() => WorkSession, workSession => workSession.user)
  // @Column()
  // workSessions: 'WorkSession[]';

  // //   @OneToMany(() => Sale, sale => sale.createdBy)
  // @Column()
  // sales: 'Sale[]';
}
