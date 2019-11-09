import { Request, Response } from 'express';
import PriceHistory from "../models/priceHistory";
import { IPriceHistory } from '../models/priceHistory';
import Product from '../models/product';

export const allPriceHistories = (req: Request, res: Response) => {
    PriceHistory.find((err: any, priceHistories: IPriceHistory[]) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        PriceHistory.countDocuments((err: any, total: number) => {
            res.json({
                ok: true,
                total,
                priceHistories
            });
        });
    });
}

export const addNewPrice = (req: Request, res: Response) => {
    let productId = req.params.product_id;
    let body = req.body;

    let priceHistory = new PriceHistory({
        pricePerKilo: body.pricePerKilo,
        pricePerVol: body.pricePerVol,
        date: new Date(),
        product: productId
    });

    priceHistory.save((err: any, priceHistoryDB: IPriceHistory) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Product.findByIdAndUpdate(productId, { $push: { priceHistories: priceHistory._id } },
            (err: any) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
            });

        res.json({
            ok: true,
            priceHistory: priceHistoryDB
        });
    });
}

export const showPriceHistory = (req: Request, res: Response) => {
    let id = req.params.id;
    PriceHistory.findById(id, (err: any, priceHistory: IPriceHistory | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!priceHistory) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            priceHistory
        });
    });
}

export const updatePriceHistory = (req: Request, res: Response) => {
    let id = req.params.id;
    let body = req.body;
    PriceHistory.findByIdAndUpdate(id, body, { new: true }, (err: any, priceHistory: IPriceHistory | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!priceHistory) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Price history not found."
                }
            });
        }

        res.json({
            ok: true,
            priceHistory
        });
    });
}

export const deletePriceHistory = (req: Request, res: Response) => {
    let id = req.params.id;
    PriceHistory.findOneAndRemove(id, (err: any, priceHistory: IPriceHistory | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!priceHistory) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "CPrice history not found."
                }
            });
        }

        res.json({
            ok: true,
            priceHistory
        });
    });
}