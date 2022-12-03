import { EntityTarget } from 'typeorm';
import { Tag } from '../entities/Tag';
import { GenericService } from '../utils/GenericService';

export class TagService extends GenericService<Tag> {
  protected validator: Tag = new Tag();

  protected get entity(): EntityTarget<Tag> {
    return Tag;
  }
}