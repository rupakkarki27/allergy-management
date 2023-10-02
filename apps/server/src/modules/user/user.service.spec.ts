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

const user = new User();
user.id = 'example-uuid';
user.firstName = 'Rupak';
user.lastName = 'Karki';
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

  describe('Find user', () => {
    it('should findOneByIdString', async () => {
      jest.spyOn(service, 'findOneByIdString').mockResolvedValue(user);

      const testUser = await service.findOneByIdString('example-uuid');

      expect(testUser).toBeDefined();
      expect(testUser).toEqual(user);
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
          firstName: 'Rupak',
          lastName: 'Karki',
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
          firstName: 'Rupak',
          password: 'hashedpassword',
          lastName: 'Karki',
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
          firstName: 'Rupak',
          lastName: 'Karki',
          role: UserRole.ADMIN,
        }),
      ).rejects.toThrowError(ConflictException);
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
  });
});
