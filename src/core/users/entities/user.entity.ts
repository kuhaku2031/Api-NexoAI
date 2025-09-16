export enum UserRole {
    OWNER = 'OWNER',
    MANAGER = 'MANAGER',
    EMPLOYEE = 'EMPLOYEE',
}

import { Company } from 'src/core/companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  company_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hasheado

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone_number: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role: 'UserRole';

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  // Relaciones
  //   @ManyToMany(() => PointSale, pointSale => pointSale.employees)
  @Column()
  pointSales: 'PointSale[]';

  //   @OneToMany(() => WorkSession, workSession => workSession.user)
  @Column()
  workSessions: 'WorkSession[]';

  //   @OneToMany(() => Sale, sale => sale.createdBy)
  @Column()
  sales: 'Sale[]';
}
