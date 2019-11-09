import "../config/env";
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee, { IEmployee } from '../models/employee';

export const loginEmployee = (req: Request, res: Response) => {
    let body = req.body;
    Employee.findOne({ email: body.email }, (err: any, employeeDB: IEmployee) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!employeeDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Email or password is incorrect"
                }
            });
        }

        if (!bcrypt.compareSync(body.password, employeeDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Email or password is incorrect"
                }
            });
        }

        let token = jwt.sign({
            employee: employeeDB
        }, process.env.SECRET as string, { expiresIn: process.env.EXP as string });

        res.json({
            ok: true,
            employee: employeeDB,
            token
        });
    });
}