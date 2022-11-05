import { PrimaryGeneratedColumn } from "typeorm";

export class GenericEntity {
    @PrimaryGeneratedColumn()
    id: number;
}