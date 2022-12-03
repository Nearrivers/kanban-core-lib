import type { EntityManager } from "typeorm";
import { MockConnection } from "../../utils/MockConnection";
import { UserService } from '../user.service';

describe('user service tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;
  let userService: UserService;
  let entityId: number = 0;
  let userToCreate;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
    userService = new UserService(manager);

    userToCreate = {
      name: 'Antoine',
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    entityId = await (await userService.create(userToCreate)).id;
  })

  test(`GIVEN I want to create a new user
  WHEN I call the create service method with a valid entity
  THEN a new user is created
  AND I am able to retrieve it`, async () => {
    const user = {
      name: 'Antoine',
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    const createdUser = await userService.create(user);

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toEqual('Antoine');
  })

  test(`GIVEN I want to create a new user
  WHEN I try to insert an user with an undefined name
  THEN no user is created`, async () => {
    const user = {
      name: undefined,
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    expect.assertions(2);
    try {
      await userService.create(user);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new user
     WHEN I try to insert an user with an empty name
     THEN no user is created`, async () => {
    const user = {
      name: '',
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    expect.assertions(2);
    try {
      await userService.create(user);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new user
     WHEN I try to insert an user with a name that is too long
     THEN no user is created`, async () => {
    const user = {
      name: 'a'.repeat(51),
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    expect.assertions(2);
    try {
      await userService.create(user);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to get all my users
  WHEN I call the findAll service method
  THEN I get all my users`, async () => {
    const users = await userService.findAll();

    expect(users.length).toBeDefined();
    expect(users).toContainEqual({
      id: entityId,
      name: userToCreate.name
    })
  })

  test(`GIVEN I want to find only one user
  WHEN I call the get service method
  THEN I get the user whose id I specified in the method call`, async () => {
    const user = await userService.get(entityId);

    expect(user).toBeDefined();
    expect(user.name).toEqual(userToCreate.name);
  })

  test(`GIVEN I want to update an user
  WHEN I call the update service method
  THEN the user whose id I specified in the method call is updated
  AND I can retrieve it`, async () => {
    const userUpdate = {
      name: 'Florian'
    }

    const updatedUser = await userService.update(entityId, userUpdate);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toEqual('Florian');
  })

  test(`GIVEN I want to update an user
  WHEN I call the update service method with an undefined user name
  THEN the user is not updated`, async () => {
    const user = {
      name: undefined,
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    expect.assertions(2);
    try {
      await userService.update(entityId, user);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to update an user
     WHEN I call the update service method with an empty name
     THEN the user is not updated`, async () => {
    const user = {
      name: '',
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    expect.assertions(2);
    try {
      await userService.update(entityId, user);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new user
     WHEN I try to insert an user with a name that is too long
     THEN no user is created`, async () => {
    const user = {
      name: 'a'.repeat(51),
      created_tasks: [],
      updated_tasks: [],
      assigned_tasks: [],
      projects: []
    };

    expect.assertions(2);
    try {
      await userService.update(entityId, user);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to delete an user
  WHEN I call the remove service method
  THEN the user whose id I specified in the method call is deleted
  AND I cannot retrieve him anymore`, async () => {
    await userService.remove(entityId);

    expect.assertions(1);
    await expect(async () => {
      await userService.get(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to delete an user that doesn't exist
  WHEN I call the remove service method
  THEN no user is deleted`, async () => {
    expect.assertions(1);
    await expect(async () => {
      await userService.remove(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to update an user that doesn't exist
  WHEN I call the update service method
  THEN no user is updated`, async () => {
    const userUpdate = {
      name: 'Florian'
    }

    expect.assertions(1);
    await expect(async () => {
      await userService.update(entityId, userUpdate);
    }).rejects.toThrow();
  })
})