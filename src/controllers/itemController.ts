import Item from '../models/item';
import * as asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

export const itemListGet = asyncHandler(async (_, res: Response) => {
    const itemList = await Item.find({}).sort({ name: 'ascending' }).exec();

    res.render('itemList', { items: itemList });
})

export const itemDetailGet = asyncHandler(async (req: Request, res: Response) => {
    const item = await Item.findById(req.params.id).exec();

    res.render('itemDetail', { item });
})

export const itemCreateGet = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const itemCreatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const itemUpdateGet = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const itemUpdatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const itemDeletePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})
