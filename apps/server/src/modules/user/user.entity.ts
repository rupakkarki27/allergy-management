import { Column, Entity, Index } from 'typeorm';
import { CustomBaseEntity } from '../../common/entity/base';

@Entity({ name: 'user' })
export class User extends CustomBaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  @Index()
  email: string;
}
