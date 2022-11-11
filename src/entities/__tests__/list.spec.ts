import { validate } from 'class-validator';
import { EntityManager } from 'typeorm';
import { MockConnection } from '../../utils/MockConnection';
import { List } from '../List';

describe('list entity tests', () => {
  const mockConnection = new MockConnection();
  let manager: EntityManager;

  beforeAll(async () => {
    manager = await mockConnection.initializeMockDb();
  })

  test(`GIVEN I want to create a new list
    WHEN I try to insert a list with the correct fields
    THEN a new list is created
    AND I am able to retrieve it`, async () => {
    const list = new List();
    list.name = 'liste';
    list.color = 0x00000000;

    await manager.save(list);

    const createdList = await manager.findOne(List, {
      where: {
        name: 'liste'
      }
    });

    expect(createdList).toBeDefined();
    expect(createdList.name).toEqual('liste');
  })

  test(`GIVEN I want to create a new list
     WHEN I try to insert a list with an undefined name
     THEN no list is created`, async () => {
    const list = new List();
    list.name = undefined;
    list.color = 0x00000000;

    const errors = await validate(list);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new list
     WHEN I try to insert a list with an empty name
     THEN no list is created`, async () => {
    const list = new List();
    list.name = '';
    list.color = 0x00000000;

    const errors = await validate(list);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.isLength).toEqual('name must be longer than or equal to 1 characters');
    }
  })

  test(`GIVEN I want to create a new list
     WHEN I try to insert a list with a name that is too long
     THEN no list is created`, async () => {
    const list = new List();
    list.name = 'a'.repeat(51);
    list.color = 0x00000000;

    const errors = await validate(list);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.isLength).toEqual('name must be shorter than or equal to 50 characters');
    }
  })

  test(`GIVEN I want to create a new list
     WHEN I try to insert a list with a negative value color
     THEN no list is created`, async () => {
    const list = new List();
    list.name = 'liste2';
    list.color = -1;

    const errors = await validate(list);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.min).toEqual('color must not be less than 0');
    }
  })

  test(`GIVEN I want to create a new list
     WHEN I try to insert a list with a color value over 0xFFFFFFFF
     THEN no list is created`, async () => {
    const list = new List();
    list.name = 'liste2';
    list.color = 0xFFFFFFFFF;

    const errors = await validate(list);

    if (!(errors.length > 0)) throw new Error();

    if (errors.length > 0) {
      expect(errors[0].constraints.max).toEqual('color must not be greater than 4294967295');
    }
  })

  // afterAll(async () => {
  //   await mockConnection.tearDown();
  // })
})