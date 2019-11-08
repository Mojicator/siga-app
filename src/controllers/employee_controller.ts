import { Request, Response } from 'express';
import Employee, { IEmployee } from '../models/employee';
import bcrypt from 'bcrypt';

const Rounds: number = 10;

export const allEmployees = (req: Request, res: Response) => {
    Employee.find((err: any, employees: IEmployee[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Employee.countDocuments((err: any, total: number) => {
            res.json({
                ok: true,
                total,
                employees
            });
        });
    });
}

export const addEmployee = (req: Request, res: Response) => {
    let body = req.body;
    let employee = new Employee({
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: body.birthDate,
        phone: body.phone,
        email: body.email,
        password: bcrypt.hashSync(body.password, Rounds)
    });

    employee.save((err: any, employeeDB: IEmployee) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            employee: employeeDB
        });
    });
}