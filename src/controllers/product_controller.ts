import { Request, Response } from 'express';
import Product from "../models/product";
import { IProduct } from "../models/product";

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

    let product = new Product();
}

export const showProduct = (req: Request, res: Response) => {

}

export const updateProduct = (req: Request, res: Response) => {

}

export const deleteProduct = (req: Request, res: Response) => {

}