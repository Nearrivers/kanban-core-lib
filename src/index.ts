import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { constructDatabase, initDatabaseConnection } from './data-access';
import { UserService } from './services/user.service';
import { ListService } from './services/list.service';
import { ProjectService } from './services/project.service';
import { TagService } from './services/tag.service';
import { TaskService } from './services/task.service';
import { GenericService } from './utils/GenericService';

export * from './domain';
export * from './data-access';
export * from './libErrorHandler';

export type LibInitOptions = {
  useBuiltInGlobalErrorHandler: boolean;
  databaseOptions: DataSourceOptions;
}

export async function initializeLibrary(options: LibInitOptions): Promise<Record<string, any>> {
  const dataSource = initDatabaseConnection(options.databaseOptions);
  const manager = await constructDatabase(dataSource);

  return {
    userService: new UserService(manager),
    listService: new ListService(manager),
    projectService: new ProjectService(manager),
    tagService: new TagService(manager),
    taskService: new TaskService(manager)
  }
}
