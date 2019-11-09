import { Request, Response } from 'express';
import Product from "../models/product";
import { IProduct } from '../models/product';
import Warehouse from '../models/warehouse';

export const allProducts = (req: Request, res: Response) => {
    Product.find((err: any, products: IProduct[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Product.countDocuments((err: any, total: number) => {
            res.json({
                ok: true,
                total,
                products
            });
        });
    });
}

export const addProduct = (req: Request, res: Response) => {
    let warehouseId = req.params.warehouse_id;
    let body = req.body;

    let product = new Product({
        name: body.name,
        quantity: body.quantity,
        warehouse: warehouseId
    });

    product.save((err: any, productDB: IProduct) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Warehouse.findByIdAndUpdate(warehouseId, { $push: { products: product._id } },
            (err: any, res: any) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: { message: "Error al guardar products in warehouse" }
                    });
                }
            });

        res.json({
            ok: true,
            product: productDB
        });
    });
}

export const showProduct = (req: Request, res: Response) => {
    let id = req.params.id;
    Product.findById(id, (err: any, product: IProduct | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!product) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product
        });
    });    
}

export const updateProduct = (req: Request, res: Response) => {
    let id = req.params.id;
    let body = req.body;
    Product.findByIdAndUpdate(id, body, { new: true }, (err: any, product: IProduct | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!product) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Product not found."
                }
            });
        }

        res.json({
            ok: true,
            product
        });
    });
}

export const deleteProduct = (req: Request, res: Response) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err: any, product: IProduct | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!product) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Product not found."
                }
            });
        }

        res.json({
            ok: true,
            product
        });
    });
}