import { validateOrReject } from 'class-validator';
import { EntityManager } from 'typeorm';
import { MockConnection } from '../../utils/MockConnection';
import { Task } from '../Task';

describe('task entity tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
  })

  test(`GIVEN I want to create a new task
    WHEN I try to insert a task with the correct fields
    THEN a new task is created
    AND I am able to retrieve it`, async () => {
    const task = new Task();
    task.name = 'Développement';
    task.description = 'Description';

    await manager.save(task);

    const createdTask = await manager.findOne(Task, {
      where: {
        name: 'Développement'
      }
    });

    expect(createdTask).toBeDefined();
    expect(createdTask.name).toEqual('Développement');
  })

  test(`GIVEN I want to create a new task
     WHEN I try to insert a task with an undefined name
     THEN no task is created`, async () => {
    const task = new Task();
    task.name = undefined;
    task.created_at = new Date().toISOString();
    task.updated_at = new Date().toISOString();

    expect.assertions(2);
    try {
      await validateOrReject(task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new task
     WHEN I try to insert a task with an empty name
     THEN no task is created`, async () => {
    const task = new Task();
    task.name = '';

    expect.assertions(2);
    try {
      await validateOrReject(task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new task
     WHEN I try to insert a task with a name that is too long
     THEN no task is created`, async () => {
    const task = new Task();
    task.name = 'a'.repeat(51);

    expect.assertions(2);
    try {
      await validateOrReject(task);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  afterAll(async () => {
    await mockConnection.tearDown();
  })
})