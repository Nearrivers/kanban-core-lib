import type { EntityManager } from "typeorm";
import { MockConnection } from "../../utils/MockConnection";
import { TaskService } from '../task.service';

describe('task service tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;
  let taskService: TaskService;
  let entityId: number = 0;
  let taskToCreate;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
    taskService = new TaskService(manager);

    taskToCreate = {
      name: 'tache 1',
      description: 'description',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    entityId = await (await taskService.create(taskToCreate)).id;
  })

  test(`GIVEN I want to create a new task
  WHEN I call the create service method with a valid entity
  THEN a new task is created
  AND I am able to retrieve it`, async () => {
    const task = {
      name: 'tache 2',
      description: 'description',
      created_at: new Date().toISOString(),
      creator: undefined,
      updated_at: new Date().toISOString(),
      last_updater: undefined,
      list: undefined,
      tags: [],
      assigned_users: []
    };

    const createdtask = await taskService.create(task);

    expect(createdtask).toBeDefined();
    expect(createdtask.name).toEqual('tache 2');
  })

  test(`GIVEN I want to create a new task
  WHEN I try to insert a task with an undefined name
  THEN no task is created`, async () => {
    const task = {
      name: undefined,
      description: 'description',
      created_at: new Date().toISOString(),
      creator: undefined,
      updated_at: new Date().toISOString(),
      last_updater: undefined,
      list: undefined,
      tags: [],
      assigned_users: []
    };

    expect.assertions(2);
    try {
      await taskService.create(task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new task
  WHEN I try to insert a task with an empty name
  THEN no task is created`, async () => {
    const task = {
      name: '',
      description: 'description',
      created_at: new Date().toISOString(),
      creator: undefined,
      updated_at: new Date().toISOString(),
      last_updater: undefined,
      list: undefined,
      tags: [],
      assigned_users: []
    };

    expect.assertions(2);
    try {
      await taskService.create(task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new task
  WHEN I try to insert a task with a name that is too long
  THEN no task is created`, async () => {
    const task = {
      name: 'a'.repeat(51),
      description: 'description',
      created_at: new Date().toISOString(),
      creator: undefined,
      updated_at: new Date().toISOString(),
      last_updater: undefined,
      list: undefined,
      tags: [],
      assigned_users: []
    };

    expect.assertions(2);
    try {
      await taskService.create(task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to get all my tasks
  WHEN I call the findAll service method
  THEN I get all my tasks`, async () => {
    const tasks = await taskService.findAll();

    expect(tasks.length).toBeDefined();
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: entityId,
          description: taskToCreate.description,
        })
      ])
    );
  })

  test(`GIVEN I want to find only one task
  WHEN I call the get service method
  THEN I get the task whose id I specified in the method call`, async () => {
    const task = await taskService.get(entityId);

    expect(task).toBeDefined();
    expect(task.name).toEqual(taskToCreate.name);
  })

  test(`GIVEN I want to update a task
  WHEN I call the update service method
  THEN the task whose id I specified in the method call is updated
  AND I can retrieve it`, async () => {
    const taskUpdate = {
      name: 'Tache 3'
    }

    const updatedtask = await taskService.update(entityId, taskUpdate);

    expect(updatedtask).toBeDefined();
    expect(updatedtask.name).toEqual('Tache 3');
  })

  test(`GIVEN I want to update a task
  WHEN I call the update service method with an undefined task name
  THEN the task is not updated`, async () => {
    const task = {
      name: undefined
    };

    expect.assertions(2);
    try {
      await taskService.update(entityId, task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to update a task
     WHEN I call the update service method with an empty name
     THEN the task is not updated`, async () => {
    const task = {
      name: ''
    };

    expect.assertions(2);
    try {
      await taskService.update(entityId, task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new task
     WHEN I try to insert a task with a name that is too long
     THEN no task is created`, async () => {
    const task = {
      name: 'a'.repeat(51)
    };

    expect.assertions(2);
    try {
      await taskService.update(entityId, task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to delete a task
  WHEN I call the remove service method
  THEN the task whose id I specified in the method call is deleted
  AND I cannot retrieve it anymore`, async () => {
    await taskService.remove(entityId);

    expect.assertions(1);
    await expect(async () => {
      await taskService.get(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to delete a task that doesn't exist
  WHEN I call the remove service method
  THEN no task is deleted`, async () => {
    expect.assertions(1);
    await expect(async () => {
      await taskService.remove(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to update a task that doesn't exist
  WHEN I call the update service method
  THEN no task is updated`, async () => {
    const taskUpdate = {
      name: 'Tache 4'
    }

    expect.assertions(1);
    await expect(async () => {
      await taskService.update(entityId, taskUpdate);
    }).rejects.toThrow();
  })
})