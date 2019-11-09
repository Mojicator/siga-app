import express from "express";
import path from "path";
import app from '../routes/index';
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response, NextFunction } from 'express';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.config();
    }

    static init(port: number) {
        return new Server(port)
    }

    private config(): void {
        this.app.use(cors());
        // this.app.use((req: Request, res: Response, next: NextFunction) => {
        //     res.header('Access-Control-Allow-Origin', '*');
        //     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        //     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //     next();
        // });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/", app);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, "../public");

        this.app.use(express.static(publicPath));
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }

}