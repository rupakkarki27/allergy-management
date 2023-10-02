import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/crud/crud.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async getAllUserDetails(email: string) {
    // if marking password field as select:false, we need to use this query, and select password manually
    const user = await User.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    return user;
  }
}
