import { GenericService } from '../utils/GenericService';
import { List } from '../entities/List';
import { EntityTarget } from 'typeorm';

export class ListService extends GenericService<List> {
  protected validator: List = new List();
  protected get entity(): EntityTarget<List> {
    return List;
  }
}