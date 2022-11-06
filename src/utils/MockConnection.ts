import path from "path";
import { DataSource, type EntityManager } from "typeorm";

export class MockConnection {
  private readonly entities;

  private readonly mockDataSource: DataSource;

  constructor() {
    this.entities = [path.join(__dirname, './../entities/*.ts')];

    this.mockDataSource = new DataSource({
      type: 'sqlite',
      database: 'test-kanban.sqlite',
      synchronize: true,
      logging: false,
      entities: this.entities,
    });
  }

  initializeMockDb(): Promise<EntityManager> {
    return this.mockDataSource.initialize().then(() => {
      return Promise.resolve(this.mockDataSource.manager);
    })
  }

  tearDown(): Promise<void> {
    return this.mockDataSource.destroy();
  }
}