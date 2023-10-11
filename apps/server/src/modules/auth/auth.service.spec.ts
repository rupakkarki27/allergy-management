import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@allergy-management/models';
import { AuthService } from './auth.service';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// const bcrypt = { hash, compare };

jest.mock('bcrypt', () => ({
  __esModule: true,
  ...jest.requireActual('bcrypt'),
}));

const user = new User();
user.email = 'rupakkarki123@gmail.com';
user.password = 'hashedpassword';
user.role = UserRole.ADMIN;

describe('Auth Service', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;

  // Repo token for DI
  const USER_REPO_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        ConfigService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should exist', () => {
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(configService).toBeDefined();
  });

  describe('Signup', () => {
    it('should signup successfully', async () => {
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve('hashedpassword'));

      jest.spyOn(userService, 'create').mockResolvedValueOnce(user);

      const result = await authService.signUp({
        email: 'rupakkarki123@gmail.com',
        password: 'password',
        role: UserRole.ADMIN,
      });

      expect(result).toBeDefined();
      expect(result).toEqual({ email: user.email, role: user.role });
    });

    it('should throw InternalServerErrorException if signin fails', async () => {
      jest.spyOn(userService, 'create').mockRejectedValue(new Error());

      expect(() =>
        authService.signUp({
          email: 'rupakkarki123@gmail.com',
          password: 'password',
          role: UserRole.ADMIN,
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('Validate User', () => {
    it('should validate the user with correct credentials', async () => {
      jest.spyOn(userService, 'getAllUserDetails').mockResolvedValueOnce(user);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      expect(
        authService.validateUser('rupakkarki123@gmail.com', 'password'),
      ).resolves.toEqual({
        email: user.email,
        role: UserRole.ADMIN,
      });
    });

    it('should throw NotFound exception if user is not found', async () => {
      jest.spyOn(userService, 'getAllUserDetails').mockResolvedValueOnce(null);

      expect(
        authService.validateUser('doesnotexist@gmail.com', 'password'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      jest.spyOn(userService, 'getAllUserDetails').mockResolvedValueOnce(user);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      expect(
        authService.validateUser('rupakkarki123@gmail.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    describe('Generate token', () => {
      it('should generate JWT token', async () => {
        jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('signed jwt');

        expect(authService.generateToken(user)).resolves.toEqual({
          accessToken: 'signed jwt',
        });
      });
    });

    describe('Sign in', () => {
      it('should sign in a user and return access token', async () => {
        jest
          .spyOn(authService, 'generateToken')
          .mockResolvedValueOnce({ accessToken: 'signed jwt' });

        expect(authService.signIn(user)).resolves.toEqual({
          token: 'signed jwt',
          user,
        });
      });
    });
  });
});
