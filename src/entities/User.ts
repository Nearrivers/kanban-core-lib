import { Column, Entity, ManyToMany, OneToMany, Relation } from 'typeorm';
import { GenericEntity } from '../utils/GenericEntity';
import { Task } from './Task';
import { Project } from './Project';

@Entity()
export class User extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @OneToMany(() => Task, (task) => task.creator)
    created_tasks?: Relation<Task[]>;

    @OneToMany(() => Task, (task) => task.last_updater)
    updated_tasks?: Relation<Task[]>;

    @ManyToMany(() => Task, (task) => task.assigned_users)
    assigned_tasks?: Relation<Task[]>;

    @ManyToMany(() => Project, (project) => project.users)
    projects: Relation<Project[]>;
}