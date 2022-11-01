import { Column, Entity, JoinColumn, OneToOne, Relation } from "typeorm";
import { ShapeType } from './ShapeTypes';
import { GenericEntity } from '../common/GenericEntity';

@Entity()
export class Shape extends GenericEntity {
    @Column({
        length: 6
    })
    color: string;

    @OneToOne(() => ShapeType)
    @JoinColumn()
    type: Relation<ShapeType>;
}