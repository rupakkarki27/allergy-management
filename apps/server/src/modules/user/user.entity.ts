import { Column, Entity, Index } from 'typeorm';
import { CustomBaseEntity } from '../../common/entity/base';
import { UserRole } from '@allergy-management/models';

@Entity({ name: 'users' })
export class User extends CustomBaseEntity {
  @Column({ nullable: false, unique: true })
  @Index()
  email: string;

  // by default make the password field non selected
  // can be selected by using query builder when needed
  @Column({ nullable: false, select: false })
  password: string;

  @Column({ enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
