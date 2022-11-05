import { IsInt, Length, Max, Min } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { GenericEntity } from "../utils/GenericEntity";
import { Project } from "./Project";
import { Task } from "./Task";

@Entity()
export class List extends GenericEntity {
    @Column()
    @Length(50)
    name: string;

    @Column()
    @IsInt()
    @Min(0)
    @Max(16777215)
    color: number;

    @ManyToOne(() => Project, (project) => project.lists)
    project: Relation<Project>;

    @OneToMany(() => Task, (task) => task.list, {
        cascade: true
    })
    tasks?: Relation<Task[]>;
}
