import { GenericService } from '../utils/GenericService';
import { Project } from '../entities/Project';
import { EntityTarget } from 'typeorm';

export class ProjectService extends GenericService<Project> {
  protected validator: Project = new Project();

  protected get entity(): EntityTarget<Project> {
    return Project;
  }
}