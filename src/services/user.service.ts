import { EntityTarget } from 'typeorm';
import { User } from '../entities/User';
import { GenericService } from '../utils/GenericService';

class UserService extends GenericService<User> {
  protected get entity(): EntityTarget<User> {
    return User;
  }
}

export const userService = new UserService();