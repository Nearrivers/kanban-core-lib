import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { GenericEntity } from '../common/GenericEntity';
import { Task } from './Task';

@Entity()
export class User extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @OneToMany(() => Task, (task) => task.creator)
    created_tasks: Relation<Task[]>;

    @OneToMany(() => Task, (task) => task.last_updater)
    updated_tasks: Relation<Task[]>;
}