import { GenericEntity } from './GenericEntity';
import type { EntityTarget, EntityManager, FindOneOptions } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class GenericService<E extends GenericEntity> {
  protected abstract get entity(): EntityTarget<E>;

  private readonly manager: EntityManager;

  protected abstract validator: E;

  constructor(dataSourceManager: EntityManager) {
    this.manager = dataSourceManager;
  }

  async findAll(): Promise<E[]> {
    const entities = await this.manager.find<E>(this.entity);

    if (entities.length === 0) throw new Error();

    return entities;
  }

  async get(id: number): Promise<E> {
    const row = await this.manager.findOneOrFail<E>(this.entity, {
      where: {
        id
      }
    } as unknown as FindOneOptions<E>);

    return row;
  }

  async create(newRow: E): Promise<E> {
    // Si j'utilise newRow directement perte du Prototype de la classe (Prototype Object obtenu à la place)
    // et donc perte de la validation
    let row = Object.create(this.validator);

    Object.keys(newRow).forEach(key => {
      row[key] = newRow[key];
    });

    try {
      await validateOrReject(row);
      return await this.manager.save(this.entity, row);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, rowUpdate: QueryDeepPartialEntity<E>): Promise<E> {
    let row = Object.create(this.validator);

    Object.keys(rowUpdate).forEach(key => {
      row[key] = rowUpdate[key];
    });
    try {
      await validateOrReject(row);
      const updateResults = await this.manager.update<E>(this.entity, id, row);

      if (updateResults.affected === 0) throw new Error();

      return await this.manager.findOne<E>(this.entity, {
        where: {
          id
        }
      } as unknown as FindOneOptions<E>);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const deleteResult = await this.manager.delete<E>(this.entity, id);

      if (deleteResult.affected === 0) throw new Error();
    } catch (error) {
      throw error;
    }
  }
}