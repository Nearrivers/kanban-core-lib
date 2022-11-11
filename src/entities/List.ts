import { IsInt, Length, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { GenericEntity } from '../utils/GenericEntity';
import { Project } from './Project';
import { Task } from './Task';

@Entity()
export class List extends GenericEntity {
    @Column()
    @Length(1, 50)
    name: string;

    @Column()
    @IsInt()
    @Min(0x00000000)
    @Max(0xFFFFFFFF)
    color: number;

    @ManyToOne(() => Project, (project) => project.lists)
    project: Relation<Project>;

    @OneToMany(() => Task, (task) => task.list, {
        cascade: ['remove']
    })
    tasks: Relation<Task[]>;
}
