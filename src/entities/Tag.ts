import { Column, Entity, ManyToMany, Relation } from "typeorm";
import { Project } from './Project';
import { GenericEntity } from '../utils/GenericEntity';
import { Task } from './Task';

@Entity()
export class Tag extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @Column()
    color: number;

    @ManyToMany(() => Project, (project) => project.tags)
    projects?: Relation<Project[]>;

    @ManyToMany(() => Task, (task) => task.tags)
    tasks?: Relation<Task[]>;
}