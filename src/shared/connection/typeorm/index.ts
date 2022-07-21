import pkg from "typeorm";
const { createConnection, getConnectionOptions } = pkg;
import { Connection } from "typeorm";

export default async (host = "localhost"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
console.log('aqui:', defaultOptions)
    if (process.env.SERVER_TYPE == 'dev') {
        console.log('aqui 2:', defaultOptions);
        return createConnection(
            Object.assign(defaultOptions, {
                host: process.env.NODE_ENV === "test" ? "localhost" : host,
                database:
                    process.env.NODE_ENV === "test"
                        ? "oficina_database"
                        : defaultOptions.database,
            })
        );
    } else {
        return createConnection(
            Object.assign(defaultOptions, {
                host: process.env.DATABASE_HOST,
                database: process.env.DATABASE_NAME
            })
        );
    }

}; 