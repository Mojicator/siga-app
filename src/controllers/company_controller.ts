import { Request, Response } from "express";
import Company, { ICompany } from '../models/company';
import { ObjectID, ObjectId } from "bson";

export const allCompanies = (req: Request, res: Response) => {
    Company.find((err: any, companies: ICompany[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Company.countDocuments((err: any, total: number) => {
            res.json({
                ok: true,
                total,
                companies
            });
        });
    });
}

export const addCompany = (req: Request, res: Response) => {
    let body = req.body;
    let company = new Company({
        name: body.name,
        giro: body.giro,
        key: body.key
    });

    company.save((err: any, companyDB: ICompany) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            company: companyDB
        });
    });
}

export const showCompany = (req: Request, res: Response) => {
    let id: ObjectID = new ObjectId(req.params.id);
    Company.findById(id, (err: any, company: ICompany | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Que paso aqui?"
                }
            });
        }

        if (!company) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Si esta entrando aqui"
                }
            });
        }

        res.json({
            ok: true,
            company
        });
    });
}

export const updateCompany = (req: Request, res: Response) => {
    Company.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err: any, company: ICompany | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!company) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Company not found."
                }
            });
        }

        res.json({
            ok: true,
            company
        });
    });
}

export const deleteCompany = (req: Request, res: Response) => {
    Company.findByIdAndRemove(req.params.id, (err: any, company: ICompany | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!company) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Company not found."
                }
            });
        }

        res.json({
            ok: true,
            company
        });
    });
}