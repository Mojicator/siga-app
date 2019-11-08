import { Request, Response } from 'express';
import Employee, { IEmployee } from '../models/employee';
import bcrypt from 'bcrypt';
import { ObjectID, ObjectId } from 'bson';

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

export const employeeById = (req: Request, res: Response) => {
    let id: ObjectID = new ObjectId(req.params.id);
    Employee.findById(id, (err: any, employee: IEmployee) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!employee) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Employee not found."
                }
            });
        }

        res.json({
            ok: true,
            employee
        });
    });
}

export const updateEmployee = (req: Request, res: Response) => {
    let id: ObjectID = new ObjectId(req.params.id);
    let body: IEmployee = req.body;
    Employee.findByIdAndUpdate(id, body, { new: true }, (err: any, employee: IEmployee | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!employee) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Employee not found."
                }
            });
        }

        res.json({
            ok: true,
            employee
        });
    });
}

export const addEmployee = (req: Request, res: Response) => {
    let body: IEmployee = req.body;
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

export const deleteEmployee = (req: Request, res: Response) => {
    let id: ObjectID = new ObjectId(req.params.id);
    Employee.findByIdAndRemove(id, (err: any, employee: IEmployee | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!employee) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Employee not found."
                }
            });
        }

        res.json({
            ok: true,
            employee
        });
    });
}