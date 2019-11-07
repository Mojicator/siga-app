import "./config/env"
import Server from './server/server';
import MongoDB from './database/mongodb';

const database = MongoDB.init(process.env.URL as string);
const server = Server.init(process.env.PORT as unknown as number);

database.mongoSetup((err: any) => {
    if (err) throw err;
    console.log("Database online");
});

server.start( () => {
    console.log("Server running");
});