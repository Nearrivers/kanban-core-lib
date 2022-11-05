import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GenericEntity {
    @PrimaryGeneratedColumn()
    id: number;
}