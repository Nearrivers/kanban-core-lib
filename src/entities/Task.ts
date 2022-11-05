import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, Relation, UpdateDateColumn } from "typeorm";
import { GenericEntity } from '../utils/GenericEntity';
import { List } from './List';
import { Tag } from "./Tag";
import { User } from './User';

@Entity()
export class Task extends GenericEntity {
    @Column({
        length: 50
    })
    name: string;

    @Column("longtext")
    description: string;

    @CreateDateColumn({
        type: "timestamp with local time zone",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.created_tasks)
    @JoinColumn()
    creator: Relation<User>;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.updated_tasks)
    @JoinColumn()
    last_updater?: Relation<User>;

    @ManyToOne(() => List, (list) => list.tasks)
    list: Relation<List>;

    @ManyToMany(() => Tag, (tag) => tag.tasks)
    @JoinTable()
    tags?: Relation<Tag[]>;
}