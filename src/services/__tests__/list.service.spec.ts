import type { EntityManager } from "typeorm";
import { MockConnection } from "../../utils/MockConnection";
import { ListService } from '../list.service';

describe('list service tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;
  let listService: ListService;
  let entityId: number = 0;
  let listToCreate;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
    listService = new ListService(manager);

    listToCreate = {
      name: 'projet 1',
      color: 0x00000000
    };

    entityId = await (await listService.create(listToCreate)).id;
  })

  test(`GIVEN I want to create a new project
  WHEN I call the create service method with a valid entity
  THEN a new list is created
  AND I am able to retrieve it`, async () => {
    const list = {
      name: 'projet 2',
      color: 0xFFFFFFFF,
      project: undefined,
      tasks: []
    };

    const createdList = await listService.create(list);

    expect(createdList).toBeDefined();
    expect(createdList.name).toEqual('projet 2');
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a list with an undefined name
  THEN no list is created`, async () => {
    const list = {
      name: undefined,
      color: 0xFFFFFFFF,
      project: undefined,
      tasks: []
    };

    expect.assertions(2);
    try {
      await listService.create(list);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a list with an empty name
  THEN no list is created`, async () => {
    const list = {
      name: '',
      color: 0xFFFFFFFF,
      project: undefined,
      tasks: []
    };

    expect.assertions(2);
    try {
      await listService.create(list);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a list with a name that is too long
  THEN no list is created`, async () => {
    const list = {
      name: 'a'.repeat(51),
      color: 0xFFFFFFFF,
      project: undefined,
      tasks: []
    };

    expect.assertions(2);
    try {
      await listService.create(list);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to get all my projects
  WHEN I call the findAll service method
  THEN I get all my projects`, async () => {
    const projects = await listService.findAll();

    expect(projects.length).toBeDefined();
    expect(projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: entityId,
          name: listToCreate.name,
          color: listToCreate.color,
        })
      ])
    );
  })

  test(`GIVEN I want to find only one project
  WHEN I call the get service method
  THEN I get the list whose id I specified in the method call`, async () => {
    const list = await listService.get(entityId);

    expect(list).toBeDefined();
    expect(list.name).toEqual(listToCreate.name);
  })

  test(`GIVEN I want to update a project
  WHEN I call the update service method
  THEN the list whose id I specified in the method call is updated
  AND I can retrieve it`, async () => {
    const projectUpdate = {
      name: 'Projet 3',
      color: 0x00000000
    }

    const updatedList = await listService.update(entityId, projectUpdate);

    expect(updatedList).toBeDefined();
    expect(updatedList.name).toEqual('Projet 3');
  })

  test(`GIVEN I want to update a project
  WHEN I call the update service method with an undefined list name
  THEN the list is not updated`, async () => {
    const list = {
      name: undefined,
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await listService.update(entityId, list);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to update a project
     WHEN I call the update service method with an empty name
     THEN the list is not updated`, async () => {
    const list = {
      name: '',
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await listService.update(entityId, list);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a list with a name that is too long
     THEN no list is created`, async () => {
    const list = {
      name: 'a'.repeat(51),
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await listService.update(entityId, list);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to delete a project
  WHEN I call the remove service method
  THEN the list whose id I specified in the method call is deleted
  AND I cannot retrieve it anymore`, async () => {
    await listService.remove(entityId);

    expect.assertions(1);
    await expect(async () => {
      await listService.get(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to delete a list that doesn't exist
  WHEN I call the remove service method
  THEN no list is deleted`, async () => {
    expect.assertions(1);
    await expect(async () => {
      await listService.remove(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to update a list that doesn't exist
  WHEN I call the update service method
  THEN no list is updated`, async () => {
    const projectUpdate = {
      name: 'Projet 4',
      color: 0x00000000
    }

    expect.assertions(1);
    await expect(async () => {
      await listService.update(entityId, projectUpdate);
    }).rejects.toThrow();
  })
})