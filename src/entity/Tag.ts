import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Project } from './Project';
import { GenericEntity } from '../common/GenericEntity';

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
    projects: Project[];
}