import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import dotenv from 'dotenv';
import { List } from './entities/List';
import { Project } from './entities/Project';
import { Tag } from './entities/Tag';
import { Task } from './entities/Task';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, List, Project, Tag, Task],
    migrations: [],
    subscribers: [],
})
