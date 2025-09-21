export enum UserRole {
    OWNER = 'OWNER',
    MANAGER = 'MANAGER',
    EMPLOYEE = 'EMPLOYEE',
}

import { Company } from 'src/core/companies/entities/company.entity';
import {
  Column,
  Entity,
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

  @ManyToOne(() => Company, (company) => company.users)
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
