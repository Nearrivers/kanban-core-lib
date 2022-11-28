import { GenericService } from '../utils/GenericService';
import { Task } from '../entities/Task';
import { EntityTarget } from 'typeorm';

export class TaskService extends GenericService<Task> {
  protected validator: Task = new Task();

  protected get entity(): EntityTarget<Task> {
    return Task;
  }
}