const userService = require('../../modules/user/user.service');
const userModel = require('../../modules/user/user.model');

const mockService = (serviceName, res, isErr) => {
   jest.spyOn(userModel, serviceName).mockImplementation(() => {
      if (isErr) {
         return Promise.reject(res);
      } else {
         return Promise.resolve(res);
      }
   });
};

describe('User service testing', () => {
   const userServiceProto = Object.getPrototypeOf(userService);
   Object.setPrototypeOf(userService, Object.assign(userServiceProto, userModel));

   test('create new user (proper values)', async () => {
      const fields = {
         name: 'New User',
         email: 'new_user@mail.com',
         password: 'password'
      };
      const user = {
         name: 'New User',
         email: 'new_user@mail.com',
         password: 'password'
      };
      mockService('create', user);
      await expect(userService.createUser(fields)).resolves.toEqual(user);
   });

   test('create new user (improper values)', async () => {
      const fields = {
         name: ['none', 2, 3],
         email: 23434,
         password: { field: 'key' }
      };
      mockService('create', new Error('Db validation error'), true);
      await expect(userService.createUser(fields)).rejects.toThrowError();
   });

   test('update user (proper values)', async () => {
      const fields = {
         id: 157,
         name: 'Very New User',
         email: 'very_new_user@mail.com',
         password: 'password'
      };
      mockService('update', 1);
      await expect(userService.updateUserById(157, fields)).resolves.toBe(1);
   });

   test('update user (improper values)', async () => {
      const fields = {
         id: '157',
         name: ' 123 123 123 ',
         email: 'very_new_user@mail.com',
         password: ['password']
      };
      mockService('update', new Error('Db validation error'), true);
      await expect(userService.updateUserById(157, fields)).rejects.toThrowError();
   });

   test('remove user (proper values)', async () => {
      mockService('delete', 1);
      await expect(userService.deleteUserById(22)).resolves.toBe(1);
   });

   test('remove user (improper values)', async () => {
      mockService('delete', new Error('Db error'), true);
      await expect(userService.deleteUserById('22')).rejects.toThrowError();
   });

   test('get user by id (proper values)', async () => {
      const user = {
         id: 153,
      };
      mockService('findOne', user);
      await expect(userService.findUserById(153)).resolves.toEqual(user);
   });

   test('get user by id (improper values)', async () => {
      mockService('findOne', new Error('some database error'), true);
      await expect(userService.findUserById('string')).rejects.toThrowError();
   });

   test('get user by id (non-existent user)', async () => {
      mockService('findOne', undefined, false);
      await expect(userService.findUserById(2000)).resolves.toBeUndefined();
   });

   test('get user by email (proper values)', async () => {
      const user = {
         email: 'default_admin@mail.com',
      };
      mockService('findOneByEmail', user);
      await expect(
          userService.findUserByEmail('default_admin@mail.com')
      ).resolves.toEqual(user);
   });

   test('get user by email (improper values)', async () => {
      mockService('findOneByEmail', new Error('some database error'), true);
      await expect(userService.findUserByEmail(2323)).rejects.toThrowError();
   });

   test('get user by email (non-existent user)', async () => {
      mockService('findOneByEmail', undefined, false);
      await expect(
          userService.findUserByEmail('randommail@mail.com')
      ).resolves.toBeUndefined();
   });

   test('get users (proper values)', async () => {
      const users = [
         {id: 1,
         name: 'user',
         email: 'email@test.com'}
      ];
      mockService('findAll', users);
      await expect(userService.findAllUsers()).resolves.toEqual(users);
   });
});

