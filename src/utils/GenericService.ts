import { GenericEntity } from './GenericEntity';
import type { EntityTarget, EntityManager, FindOneOptions, UpdateResult, DeleteResult } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class GenericService<E extends GenericEntity> {
  protected abstract get entity(): EntityTarget<E>;

  private readonly manager: EntityManager;

  async findAll(): Promise<E[]> {
    return await this.manager.find<E>(this.entity);
  }

  async get(id: number): Promise<E> {
    return await this.manager.findOne<E>(this.entity, {
      where: {
        id
      }
    } as unknown as FindOneOptions<E>);
  }

  async create(newRow: E): Promise<E> {
    try {
      await validateOrReject(newRow);
      return await this.manager.save(this.entity, newRow);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, rowUpdate: QueryDeepPartialEntity<E>): Promise<UpdateResult> {
    try {
      await validateOrReject(rowUpdate);
      return await this.manager.update<E>(this.entity, id, rowUpdate);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.manager.delete<E>(this.entity, id);
    } catch (error) {
      throw error;
    }
  }
}