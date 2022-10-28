import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from '../common/GenericEntity';

@Entity()
export class User extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;
}