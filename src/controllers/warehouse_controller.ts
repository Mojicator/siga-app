import { Request, Response } from 'express';
import Warehouse from '../models/warehouse';
import { IWarehouse } from '../models/warehouse';
import Company from '../models/company';

export const allWarehouses = (req: Request, res: Response) => {
    Warehouse.find((err: any, warehouses: IWarehouse[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Warehouse.countDocuments((err: any, total: number) => {
            res.json({
                ok: true,
                total,
                warehouses
            });
        });
    });
}

export const addWarehouse = (req: Request, res: Response) => {
    let companyId = req.params.company_id;
    let body = req.body;

    let warehouse = new Warehouse({
        name: body.name,
        company: companyId
    });

    warehouse.save((err: any, warehouseDB: IWarehouse) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Company.findByIdAndUpdate(companyId, { $push: { warehouses: warehouse._id } },
            (err: any, res: any) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: { message: "Error al guardar warehoses in company" }
                    });
                }
            });

        res.json({
            ok: true,
            warehouse: warehouseDB
        });
    });
}

export const showWarehouse = (req: Request, res: Response) => {
    let id = req.params.id;
    Warehouse.findById(id, (err: any, warehouse: IWarehouse | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!warehouse) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            warehouse
        });
    });
}

export const updateWarehouse = (req: Request, res: Response) => {
    let id = req.params.id;
    let body = req.body;
    Warehouse.findByIdAndUpdate(id, body, { new: true }, (err: any, warehouse: IWarehouse | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!warehouse) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Warehouse not found."
                }
            });
        }

        res.json({
            ok: true,
            warehouse
        });
    });
}

export const deleteWarehouse = (req: Request, res: Response) => {
    let id = req.params.id;
    Warehouse.findByIdAndRemove(id, (err: any, warehouse: IWarehouse | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!warehouse) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Warehouse not found."
                }
            });
        }

        res.json({
            ok: true,
            warehouse
        });
    });
}

export const getProductByWarehouseId = (req: Request, res: Response) => {
    let warehouseId = req.params.warehouse_id;
    Warehouse.findById(warehouseId).
        select("products").
        populate("products", "name", "quantity").
        exec().
        then(doc => {
            res.json({
                ok: true,
                doc
            });
        }).
        catch(err => {
            return res.status(500).json({
                ok: false,
                err
            });
        });
}
