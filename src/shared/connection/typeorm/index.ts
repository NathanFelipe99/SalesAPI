import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: "postgres",
    database: "sales_database",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "1234",
    entities: [
        "./src/modules/**/infra/models/**/*.ts",
    ],
    synchronize: true
});