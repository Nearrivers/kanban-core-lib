import { Column, Entity, ManyToMany, Relation } from "typeorm";
import { Project } from './Project';
import { GenericEntity } from '../utils/GenericEntity';
import { Task } from './Task';
import { IsInt, Length, Max, Min } from "class-validator";

@Entity()
export class Tag extends GenericEntity {
    @Column()
    @Length(50)
    name: string;

    @Column()
    @IsInt()
    @Min(0x0000000)
    @Max(0xFFFFFFF)
    color: number;

    @ManyToMany(() => Project, (project) => project.tags)
    projects?: Relation<Project[]>;

    @ManyToMany(() => Task, (task) => task.tags)
    tasks?: Relation<Task[]>;
}