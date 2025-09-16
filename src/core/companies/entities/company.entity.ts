import { User } from 'src/core/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class Company {
  @PrimaryColumn()
  company_id: string;

  @Column()
  company_name: string;

  @Column()
  business_type: string;

  @Column(' unique: true ')
  email: string;

  @Column()
  phone_number: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
