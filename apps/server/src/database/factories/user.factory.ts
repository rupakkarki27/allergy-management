import { define } from 'typeorm-seeding';
import { User } from '../../modules/user/user.entity';
import { UserRole } from '@allergy-management/models';
import { randEmail } from '@ngneat/falso';

const userRoles = [UserRole.ADMIN, UserRole.USER];

define(User, () => {
  const email = randEmail();
  const password =
    '$2b$10$LAEf/J25gUQB6RNY8Cd8g.vQV4Dr5cSwluCh9F8Actl1I/nrxD6ca';

  const role = userRoles[Math.floor(Math.random() * userRoles.length)];

  const user = new User();
  user.email = email;
  user.password = password;
  user.role = role;

  return user;
});
