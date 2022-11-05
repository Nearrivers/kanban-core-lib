import { Column, Entity, Relation, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tag } from './Tag';
import { GenericEntity } from '../utils/GenericEntity';
import { List } from './List';
import { User } from './User';
import { IsDefined, IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';

@Entity()
export class Project extends GenericEntity {
    @Column()
    @Length(50)
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsInt()
    @Min(0x0000000)
    @Max(0xFFFFFFF)
    @IsDefined()
    @IsNotEmpty()
    color: number;

    @ManyToMany(() => Tag, (tag) => tag.projects)
    @JoinTable({
        name: "projects_tags",
        joinColumn: {
            name: "project",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "tag",
            referencedColumnName: "id"
        }
    })
    tags?: Relation<Tag[]>;

    @ManyToMany(() => User, (user) => user.projects)
    @JoinTable({
        name: "projects_users",
        joinColumn: {
            name: "project",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user",
            referencedColumnName: "id"
        }
    })
    users: Relation<User[]>;

    @OneToMany(() => List, (list) => list.project, {
        cascade: true
    })
    @JoinTable()
    lists?: Relation<List[]>;
}