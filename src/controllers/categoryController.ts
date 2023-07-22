import Category from '../models/category';
import * as asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

export const categoryListGet = asyncHandler(async (_, res: Response) => {
    const categoryList = await Category.find({}).sort({ name: 'ascending' }).exec();

    res.render('categoryList', { categories: categoryList });
})

export const categoryDetailGet = asyncHandler(async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id).exec();

    res.render('categoryDetail', { category });
})

export const categoryCreateGet = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const categoryCreatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const categoryUpdateGet = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const categoryUpdatePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})

export const categoryDeletePost = asyncHandler(async (req: Request, res: Response) => {
    res.send('TODO');
})
