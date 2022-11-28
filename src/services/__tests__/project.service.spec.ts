import type { EntityManager } from "typeorm";
import { MockConnection } from "../../utils/MockConnection";
import { ProjectService } from '../project.service';

describe('project service tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;
  let projectService: ProjectService;
  let entityId: number = 0;
  let projectToCreate;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
    projectService = new ProjectService(manager);

    projectToCreate = {
      name: 'projet 1',
      color: 0x00000000
    };

    entityId = await (await projectService.create(projectToCreate)).id;
  })

  test(`GIVEN I want to create a new project
  WHEN I call the create service method with a valid entity
  THEN a new project is created
  AND I am able to retrieve it`, async () => {
    const project = {
      name: 'projet 2',
      color: 0xFFFFFFFF,
      tags: [],
      users: [],
      lists: []
    };

    const createdProject = await projectService.create(project);

    expect(createdProject).toBeDefined();
    expect(createdProject.name).toEqual('projet 2');
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a project with an undefined name
  THEN no project is created`, async () => {
    const project = {
      name: undefined,
      color: 0xFFFFFFFF,
      tags: [],
      users: [],
      lists: []
    };

    expect.assertions(2);
    try {
      await projectService.create(project);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a project with an empty name
  THEN no project is created`, async () => {
    const project = {
      name: '',
      color: 0xFFFFFFFF,
      tags: [],
      users: [],
      lists: []
    };

    expect.assertions(2);
    try {
      await projectService.create(project);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a project with a name that is too long
  THEN no project is created`, async () => {
    const project = {
      name: 'a'.repeat(51),
      color: 0xFFFFFFFF,
      tags: [],
      users: [],
      lists: []
    };

    expect.assertions(2);
    try {
      await projectService.create(project);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to get all my projects
  WHEN I call the findAll service method
  THEN I get all my projects`, async () => {
    const projects = await projectService.findAll();

    expect(projects.length).toBeDefined();
    expect(projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: entityId,
          name: projectToCreate.name,
          color: projectToCreate.color,
        })
      ])
    );
  })

  test(`GIVEN I want to find only one project
  WHEN I call the get service method
  THEN I get the project whose id I specified in the method call`, async () => {
    const project = await projectService.get(entityId);

    expect(project).toBeDefined();
    expect(project.name).toEqual(projectToCreate.name);
  })

  test(`GIVEN I want to update a project
  WHEN I call the update service method
  THEN the project whose id I specified in the method call is updated
  AND I can retrieve it`, async () => {
    const projectUpdate = {
      name: 'Projet 3',
      color: 0x00000000
    }

    const updatedProject = await projectService.update(entityId, projectUpdate);

    expect(updatedProject).toBeDefined();
    expect(updatedProject.name).toEqual('Projet 3');
  })

  test(`GIVEN I want to update a project
  WHEN I call the update service method with an undefined project name
  THEN the project is not updated`, async () => {
    const project = {
      name: undefined,
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await projectService.update(entityId, project);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to update a project
     WHEN I call the update service method with an empty name
     THEN the project is not updated`, async () => {
    const project = {
      name: '',
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await projectService.update(entityId, project);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a project with a name that is too long
     THEN no project is created`, async () => {
    const project = {
      name: 'a'.repeat(51),
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await projectService.update(entityId, project);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to delete a project
  WHEN I call the remove service method
  THEN the project whose id I specified in the method call is deleted
  AND I cannot retrieve it anymore`, async () => {
    await projectService.remove(entityId);

    expect.assertions(1);
    await expect(async () => {
      await projectService.get(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to delete a project that doesn't exist
  WHEN I call the remove service method
  THEN no project is deleted`, async () => {
    expect.assertions(1);
    await expect(async () => {
      await projectService.remove(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to update a project that doesn't exist
  WHEN I call the update service method
  THEN no project is updated`, async () => {
    const projectUpdate = {
      name: 'Projet 4',
      color: 0x00000000
    }

    expect.assertions(1);
    await expect(async () => {
      await projectService.update(entityId, projectUpdate);
    }).rejects.toThrow();
  })
})