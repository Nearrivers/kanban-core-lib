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
    // JoinColumn indique que la relation est unidirectionnelle
    // i.E: les projets peuvent obtenir les tags mais pas l'inverse
    @JoinColumn()
    shape: Relation<Shape>;

    @ManyToMany(() => Tag, (tag) => tag.projects)
    @JoinTable()
    tags: Relation<Tag[]>;

    @OneToMany(() => List, (list) => list.project)
    @JoinTable()
    lists: Relation<List[]>;
}