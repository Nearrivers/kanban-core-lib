import { GenericService } from '../utils/GenericService';
import { Project } from '../entities/Project';
import { EntityTarget } from 'typeorm';

class ProjectService extends GenericService<Project> {
  protected get entity(): EntityTarget<Project> {
    return Project;
  }
}

export const projectService = new ProjectService();