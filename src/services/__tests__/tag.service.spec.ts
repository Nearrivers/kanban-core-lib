import type { EntityManager } from "typeorm";
import { MockConnection } from "../../utils/MockConnection";
import { TagService } from '../tag.service';

describe('tag service tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;
  let tagService: TagService;
  let entityId: number = 0;
  let tagToCreate;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
    tagService = new TagService(manager);

    tagToCreate = {
      name: 'tag 1',
      color: 0x00000000
    };

    entityId = await (await tagService.create(tagToCreate)).id;
  })

  test(`GIVEN I want to create a new project
  WHEN I call the create service method with a valid entity
  THEN a new tag is created
  AND I am able to retrieve it`, async () => {
    const tag = {
      name: 'projet 2',
      color: 0xFFFFFFFF,
      projects: undefined,
      tasks: []
    };

    const createdTag = await tagService.create(tag);

    expect(createdTag).toBeDefined();
    expect(createdTag.name).toEqual('projet 2');
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a tag with an undefined name
  THEN no tag is created`, async () => {
    const tag = {
      name: undefined,
      color: 0xFFFFFFFF,
      projects: undefined,
      tasks: []
    };

    expect.assertions(2);
    try {
      await tagService.create(tag);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a tag with an empty name
  THEN no tag is created`, async () => {
    const tag = {
      name: '',
      color: 0xFFFFFFFF,
      projects: undefined,
      tasks: []
    };

    expect.assertions(2);
    try {
      await tagService.create(tag);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
  WHEN I try to insert a tag with a name that is too long
  THEN no tag is created`, async () => {
    const tag = {
      name: 'a'.repeat(51),
      color: 0xFFFFFFFF,
      projects: undefined,
      tasks: []
    };

    expect.assertions(2);
    try {
      await tagService.create(tag);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to get all my projects
  WHEN I call the findAll service method
  THEN I get all my projects`, async () => {
    const projects = await tagService.findAll();

    expect(projects.length).toBeDefined();
    expect(projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: entityId,
          name: tagToCreate.name,
          color: tagToCreate.color,
        })
      ])
    );
  })

  test(`GIVEN I want to find only one project
  WHEN I call the get service method
  THEN I get the tag whose id I specified in the method call`, async () => {
    const tag = await tagService.get(entityId);

    expect(tag).toBeDefined();
    expect(tag.name).toEqual(tagToCreate.name);
  })

  test(`GIVEN I want to update a project
  WHEN I call the update service method
  THEN the tag whose id I specified in the method call is updated
  AND I can retrieve it`, async () => {
    const projectUpdate = {
      name: 'Projet 3',
      color: 0x00000000
    }

    const updatedTag = await tagService.update(entityId, projectUpdate);

    expect(updatedTag).toBeDefined();
    expect(updatedTag.name).toEqual('Projet 3');
  })

  test(`GIVEN I want to update a project
  WHEN I call the update service method with an undefined tag name
  THEN the tag is not updated`, async () => {
    const tag = {
      name: undefined,
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await tagService.update(entityId, tag);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to update a project
     WHEN I call the update service method with an empty name
     THEN the tag is not updated`, async () => {
    const tag = {
      name: '',
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await tagService.update(entityId, tag);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new project
     WHEN I try to insert a tag with a name that is too long
     THEN no tag is created`, async () => {
    const tag = {
      name: 'a'.repeat(51),
      color: 0x00000000
    };

    expect.assertions(2);
    try {
      await tagService.update(entityId, tag);
    } catch (errors) {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to delete a project
  WHEN I call the remove service method
  THEN the tag whose id I specified in the method call is deleted
  AND I cannot retrieve it anymore`, async () => {
    await tagService.remove(entityId);

    expect.assertions(1);
    await expect(async () => {
      await tagService.get(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to delete a tag that doesn't exist
  WHEN I call the remove service method
  THEN no tag is deleted`, async () => {
    expect.assertions(1);
    await expect(async () => {
      await tagService.remove(entityId);
    }).rejects.toThrow();
  })

  test(`GIVEN I want to update a tag that doesn't exist
  WHEN I call the update service method
  THEN no tag is updated`, async () => {
    const projectUpdate = {
      name: 'Projet 4',
      color: 0x00000000
    }

    expect.assertions(1);
    await expect(async () => {
      await tagService.update(entityId, projectUpdate);
    }).rejects.toThrow();
  })
})