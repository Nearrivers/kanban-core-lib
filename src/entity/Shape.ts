import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShapeType } from './ShapeTypes';

@Entity()
export class Shape {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 6
    })
    color: string;

    @OneToOne(() => ShapeType)
    @JoinColumn()
    type: ShapeType;
}