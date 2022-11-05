import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { GenericEntity } from "../utils/GenericEntity";
import { Project } from "./Project";
import { Task } from "./Task";

@Entity()
export class List extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @Column()
    color: number;

    @ManyToOne(() => Project, (project) => project.lists)
    project: Relation<Project>;

    @OneToMany(() => Task, (task) => task.list, {
        cascade: true
    })
    tasks?: Relation<Task[]>;
}
