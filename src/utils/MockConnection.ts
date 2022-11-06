import { DataSource, type EntityManager } from 'typeorm';

export class MockConnection {
  private readonly mockDataSource: DataSource;

  constructor(entity) {
    this.mockDataSource = new DataSource({
      type: 'sqlite',
      database: 'test-kanban.sqlite',
      synchronize: true,
      logging: false,
      entities: [entity],
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