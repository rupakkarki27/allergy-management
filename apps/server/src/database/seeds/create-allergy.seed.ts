import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Allergy } from '../../modules/allergy/allergy.entity';

export default class CreateAllergies implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Allergy)().createMany(15);
  }
}
