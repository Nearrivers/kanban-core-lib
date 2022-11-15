import { IsDateString, Length } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Relation, UpdateDateColumn } from 'typeorm';
import { GenericEntity } from '../utils/GenericEntity';
import { List } from './List';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
export class Task extends GenericEntity {
    @Column()
    @Length(1, 50)
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: string;

    @ManyToOne(() => User, (user) => user.created_tasks)
    @JoinColumn()
    creator: Relation<User>;

    @UpdateDateColumn()
    updated_at: string;

    @ManyToOne(() => User, (user) => user.updated_tasks)
    @JoinColumn()
    last_updater?: Relation<User>;

    @ManyToOne(() => List, (list) => list.tasks)
    list: Relation<List>;

    @ManyToMany(() => Tag, (tag) => tag.tasks)
    @JoinTable({
        name: 'tasks_tags',
        joinColumn: {
            name: 'task',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'tag',
            referencedColumnName: 'id'
        }
    })
    tags: Relation<Tag[]>;

    @ManyToMany(() => User, (user) => user.assigned_tasks)
    @JoinTable({
        name: 'tasks_users',
        joinColumn: {
            name: 'task',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user',
            referencedColumnName: 'id'
        }
    })
    assigned_users: Relation<User[]>;
}