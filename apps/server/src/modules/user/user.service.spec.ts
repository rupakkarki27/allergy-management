import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from '@allergy-management/models';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

// Mock the external module and the paginate function
jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue({
    items: [],
    meta: {
      itemCount: 0,
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
    },
  }),
}));

const user = new User();
user.email = 'rupakkarki123@gmail.com';
user.role = UserRole.ADMIN;

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  // Repo token for DI
  const USER_REPO_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(USER_REPO_TOKEN);
  });

  it('user service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user repo should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('Find all user by pagination', () => {
    it('should find all users with pagination', async () => {
      const all = await service.findAll({ limit: 10, page: 1 });

      expect(all.items).toEqual([]);
    });
  });

  describe('Find user', () => {
    it('should find one user by id', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(user);

      const testUser = await service.findOneByIdString('example-uuid');

      expect(testUser).toBeDefined();
      expect(testUser).toEqual(user);
    });

    it('should find one user by find options', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(user);

      expect(
        await service.findOneByOptions({
          where: { id: 'a-uuid', email: 'rupakkarki123@gmail.com' },
        }),
      ).toEqual(user);
    });

    it('should find user by email', () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue(user);

      expect(
        service.findOneByWhereOptions({ email: 'rupakkarki123@gmail.com' }),
      ).resolves.toEqual(user);
      expect(repoSpy).toBeCalledWith({ email: 'rupakkarki123@gmail.com' });
      expect(repoSpy).toBeCalledTimes(1);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);

      expect(
        service.findOneByOptions({ where: { id: 'wrong-uuid' } }),
      ).rejects.toThrow(NotFoundException);
      expect(
        service.findOneByWhereOptions({ id: 'wrong-uuid' }),
      ).rejects.toThrow(NotFoundException);
      expect(service.findOneByIdString('wrong-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Create user', () => {
    it('should create a new user', () => {
      jest.spyOn(repo, 'save').mockResolvedValueOnce(user);
      expect(
        service.create({
          email: 'rupakkarki123@gmail.com',
          password: 'hashedpassword',
          role: UserRole.ADMIN,
        }),
      ).resolves.toEqual(user);
      expect(repo.save).toBeCalledTimes(1);
    });
    it('should throw BadRequestException', async () => {
      const repoSpy = jest.spyOn(repo, 'save').mockRejectedValue(new Error());
      await expect(
        service.create({
          email: 'rupakkarki123@gmail.com',
          password: 'hashedpassword',
          role: UserRole.ADMIN,
        }),
      ).rejects.toThrow(BadRequestException);
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
    it('should throw ConflictException', () => {
      const repoSpy = jest
        .spyOn(repo, 'save')
        .mockRejectedValueOnce({ driverError: { code: '23505' } });
      expect(
        service.create({
          email: 'rupakkarki123@gmail.com',
          password: 'hashedpassword',
          role: UserRole.ADMIN,
        }),
      ).rejects.toThrowError(ConflictException);
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update user', () => {
    it('should update a user', async () => {
      jest
        .spyOn(repo, 'update')
        .mockResolvedValueOnce({ raw: '', affected: 1, generatedMaps: [] });

      expect(
        await service.update('a-uuid', { email: 'newemail@gmail.com' }),
      ).toEqual({ raw: '', affected: 1, generatedMaps: [] });
    });

    it('should throw an exception if update fails', async () => {
      jest.spyOn(repo, 'update').mockRejectedValueOnce(new Error());

      expect(() =>
        service.update('wrong-uuid', { email: 'rupak@' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Delete user', () => {
    it('should delete a user', async () => {
      jest
        .spyOn(repo, 'delete')
        .mockResolvedValueOnce({ raw: '', affected: 1 });

      expect(await service.delete('uuid')).toEqual({ raw: '', affected: 1 });
    });

    it('should throw a exception if deletion fails', async () => {
      jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error());

      expect(() => service.delete('wrong-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
