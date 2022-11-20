import { EntityTarget } from 'typeorm';
import { Tag } from '../entities/Tag';
import { GenericService } from '../utils/GenericService';

class TagService extends GenericService<Tag> {
  protected get entity(): EntityTarget<Tag> {
    return Tag;
  }
}

export const tagService = new TagService();