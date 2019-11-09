import "../config/env"
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    let token:string = req.get("Authorization") as string;

    jwt.verify(token, process.env.SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        res.locals.token = decoded.employee;
        next();
    });
}