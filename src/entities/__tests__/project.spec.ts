import { validate } from 'class-validator';
import { EntityManager } from 'typeorm';
import { MockConnection } from '../../utils/MockConnection';
import { Project } from '../Project';

describe('project entity tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
  })

  test(`GIVEN I want to create a new project
    WHEN I try to insert a project with the correct fields
    THEN a new project is created
    AND I am able to retrieve it`, async () => {
    const project = new Project();
    project.name = 'Centaure';
    project.color = 0x00000000;

    await manager.save(project);

    const createdProject = await manager.findOne(Project, {
      where: {
        name: 'Centaure'
      }
    });

    expect(createdProject).toBeDefined();
    expect(createdProject.name).toEqual('Centaure');
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a project with an undefined name
     THEN no project is created`, async () => {
    const project = new Project();
    project.name = undefined;
    project.color = 0x00000000;

    const errors = await validate(project);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a project with an empty name
     THEN no project is created`, async () => {
    const project = new Project();
    project.name = '';
    project.color = 0x00000000;

    const errors = await validate(project);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a project with a name that is too long
     THEN no project is created`, async () => {
    const project = new Project();
    project.name = 'a'.repeat(51);
    project.color = 0x00000000;

    const errors = await validate(project);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a project with a negative value color
     THEN no project is created`, async () => {
    const project = new Project();
    project.name = 'project2';
    project.color = -1;

    const errors = await validate(project);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.min).toEqual('color must not be less than 0');
    }
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a project with a color value over 0xFFFFFFFF
     THEN no project is created`, async () => {
    const project = new Project();
    project.name = 'project2';
    project.color = 0xFFFFFFFFF;

    const errors = await validate(project);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.max).toEqual('color must not be greater than 4294967295');
    }
  })

  // afterAll(async () => {
  //   await mockConnection.tearDown();
  // })
})