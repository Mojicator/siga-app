import Server from './server/server';
import MongoDB from './database/mongodb';

const database = MongoDB.init("mongodb://localhost:27017/siga-development");
const server = Server.init(3000);

database.mongoSetup((err: any) => {
    if (err) throw err;
    console.log("Database online");
});

server.start( () => {
    console.log("Server running");
});