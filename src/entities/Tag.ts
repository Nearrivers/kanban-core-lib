import { Column, Entity, JoinTable, ManyToMany, Relation } from "typeorm";
import { Project } from './Project';
import { GenericEntity } from '../common/GenericEntity';
import { Task } from './Task';

@Entity()
export class Tag extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @Column({
        length: 6
    })
    color: string;

    @ManyToMany(() => Project, (project) => project.tags)
    @JoinTable()
    projects: Relation<Project[]>;

    @ManyToMany(() => Task, (task) => task.tags)
    @JoinTable()
    tasks: Relation<Task[]>;
}