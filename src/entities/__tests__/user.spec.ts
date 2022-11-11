import { validate } from 'class-validator';
import { EntityManager } from 'typeorm';
import { checkValidation } from '../../utils/CheckValidationUtils';
import { MockConnection } from '../../utils/MockConnection';
import { User } from '../User';

describe('user entity tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
  })

  test(`GIVEN I want to create a new user
    WHEN I try to insert an user with the correct fields
    THEN a new user is created
    AND I am able to retrieve it`, async () => {
    const user = new User();
    user.name = 'Antoine';

    await manager.save(user);

    const createdUser = await manager.findOne(User, {
      where: {
        name: 'Antoine'
      }
    });

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toEqual('Antoine');
  })

  test(`GIVEN I want to create a new user
     WHEN I try to insert an user with an undefined name
     THEN no user is created`, async () => {
    const user = new User();
    user.name = undefined;

    expect.assertions(1);
    try {
      await checkValidation(user, 'isLength');
    } catch (error) {
      expect(error.message).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new user
     WHEN I try to insert an user with an empty name
     THEN no user is created`, async () => {
    const user = new User();
    user.name = '';

    expect.assertions(1);
    try {
      await checkValidation(user, 'isLength');
    } catch (error) {
      expect(error.message).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new user
     WHEN I try to insert an user with a name that is too long
     THEN no user is created`, async () => {
    const user = new User();
    user.name = 'a'.repeat(51);

    expect.assertions(1);
    try {
      await checkValidation(user, 'isLength');
    } catch (error) {
      expect(error.message).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  afterAll(async () => {
    await mockConnection.tearDown();
  })
})