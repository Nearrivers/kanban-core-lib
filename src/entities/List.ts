import { IsDefined, isDefined, IsInt, IsNotEmpty, isNotEmpty, Length, Max, Min } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { GenericEntity } from "../utils/GenericEntity";
import { Project } from "./Project";
import { Task } from "./Task";

@Entity()
export class List extends GenericEntity {
    @Column()
    @Length(50)
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsInt()
    @Min(0x0000000)
    @Max(0xFFFFFFF)
    @IsDefined()
    @IsNotEmpty()
    color: number;

    @ManyToOne(() => Project, (project) => project.lists)
    project: Relation<Project>;

    @OneToMany(() => Task, (task) => task.list, {
        cascade: true
    })
    tasks?: Relation<Task[]>;
}
