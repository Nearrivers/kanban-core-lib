import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShapeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;
}