import { Column, Entity, Relation, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tag } from './Tag';
import { GenericEntity } from '../utils/GenericEntity';
import { List } from './List';

@Entity()
export class Project extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @Column()
    color: number;

    @ManyToMany(() => Tag, (tag) => tag.projects)
    @JoinTable()
    tags?: Relation<Tag[]>;

    @OneToMany(() => List, (list) => list.project)
    @JoinTable()
    lists?: Relation<List[]>;
}