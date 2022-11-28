import { EntityTarget } from 'typeorm';
import { User } from '../entities/User';
import { GenericService } from '../utils/GenericService';

export class UserService extends GenericService<User> {
  protected validator: User = new User();

  protected get entity(): EntityTarget<User> {
    return User;
  }
}