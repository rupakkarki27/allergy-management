import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../common/entity/base';
import { AllergySeverity } from '@allergy-management/models';

@Entity({ name: 'allergies' })
export class Allergy extends CustomBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column('text', { nullable: false, array: true })
  symptoms: string[];

  @Column({
    type: 'enum',
    enum: AllergySeverity,
    default: AllergySeverity.MILD,
  })
  severity: AllergySeverity;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  notes?: string;
}
