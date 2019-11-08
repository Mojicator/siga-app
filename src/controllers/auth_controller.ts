import "../config/env";
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee, { IEmployee } from '../models/employee';

export const loginEmployee = (req: Request, res: Response) => {
    let body = req.body;
    Employee.findOne({ email: body.email }, (err: any, employeeDB: IEmployee) => {
        if (err) {
            console.log("trono!");
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!employeeDB) {
            console.log("usuario not found");
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Email or password is incorrect"
                }
            });
        }

        if (!bcrypt.compareSync(body.password, employeeDB.password)) {
            console.log("mala contraseña");
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

        console.log("Pasa!");
        res.json({
            ok: true,
            token
        });
    });
}