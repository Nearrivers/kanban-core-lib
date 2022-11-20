import { GenericService } from '../utils/GenericService';
import { List } from '../entities/List';
import { EntityTarget } from 'typeorm';

class ListService extends GenericService<List> {
  protected get entity(): EntityTarget<List> {
    return List;
  }
}

export const listService = new ListService();