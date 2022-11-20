import { GenericService } from '../utils/GenericService';
import { Task } from '../entities/Task';
import { EntityTarget } from 'typeorm';

class TaskService extends GenericService<Task> {
  protected get entity(): EntityTarget<Task> {
    return Task;
  }
}

export const taskService = new TaskService();