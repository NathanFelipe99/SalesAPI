export default {
    type: "postgres",
    database: "sales_database",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "1234",
    entities: [
        "./src/modules/**/infra/models/*.ts"
    ],
    migrations: [
        "./src/shared/connection/typeorm/migrations/*.ts"
    ],
    cli: {
        "migrationsDir": "./src/shared/connection/typeorm/migrations"
    },
    synchronize: true
}