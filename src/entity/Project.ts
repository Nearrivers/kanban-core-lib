import { Column, Entity, OneToOne, JoinColumn, Relation, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Shape } from './Shape';
import { Tag } from './Tag';
import { GenericEntity } from '../common/GenericEntity';
import { List } from './List';

@Entity()
export class Project extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @OneToOne(() => Shape)
    @JoinColumn()
    shape: Relation<Shape>;

    @ManyToMany(() => Tag, (tag) => tag.projects)
    @JoinTable()
    tags: Tag[];

    @OneToMany(() => List, (list) => list.project)
    lists: List[];
}