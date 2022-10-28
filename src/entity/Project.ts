import { Column, Entity, OneToOne, JoinColumn, Relation, ManyToMany, JoinTable } from 'typeorm';
import { Shape } from './Shape';
import { Tag } from './Tag';
import { GenericEntity } from '../common/GenericEntity';

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
}