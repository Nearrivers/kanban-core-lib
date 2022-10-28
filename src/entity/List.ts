import { Column, Entity, ManyToOne } from "typeorm";
import { GenericEntity } from "../common/GenericEntity";
import { Project } from "./Project";

@Entity()
export class List extends GenericEntity {

    @Column({
        length: 50
    })
    name: string;

    @Column({
        length: 6
    })
    color: string;

    @ManyToOne(() => Project, (project) => project.lists)
    project: Project;
}
