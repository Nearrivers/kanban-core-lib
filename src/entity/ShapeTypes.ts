import { Column, Entity } from "typeorm";
import { GenericEntity } from '../common/GenericEntity';

@Entity()
export class ShapeType extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;
}