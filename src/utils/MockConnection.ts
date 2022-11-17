import path from "path";
import { DataSource, type EntityManager } from "typeorm";

export class MockConnection {
  private readonly mockDataSource: DataSource;

  constructor() {
    const entities = [path.join(__dirname, './../entities/*.ts')];

    this.mockDataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: entities,
      dropSchema: true
    });
  }

  async initializeMockDb(): Promise<EntityManager> {
    return await this.mockDataSource.initialize().then(() => {
      return this.mockDataSource.manager;
    })
  }

  tearDown(): Promise<void> {
    return this.mockDataSource.destroy();
  }
}