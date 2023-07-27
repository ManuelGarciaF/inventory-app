import * as asyncHandler from 'express-async-handler'
import * as createError from 'http-errors'
import { body, validationResult, matchedData } from 'express-validator'
import * as debugModule from 'debug'
import Category from '../models/category'
import Item from '../models/item'
import { type Request, type Response, type NextFunction } from 'express'

const debug = debugModule('category')

export const categoryListGet = asyncHandler(async (_, res: Response) => {
  const categoryList = await Category.find({}).sort({ name: 'ascending' }).exec()

  res.render('categoryList', { categories: categoryList })
})

export const categoryDetailGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).sort({ name: 1 }).exec()
  ])

  if (category === null) {
    const err = new Error('Category not found')
    res.status(404)
    next(err)
  }

  res.render('categoryDetail', { category, items })
})

export const categoryCreateGet = asyncHandler(async (_req: Request, res: Response) => {
  res.render('categoryForm', { create: true, category: null })
})

export const categoryCreatePost = [
  // Validate and sanitize fields.
  body('name').trim().isLength({ min: 1 }).escape(),
  body('description').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      next(createError(400))
      return
    }

    const data = matchedData(req)
    const category = new Category(data)

    await category.save()

    if (category.url === undefined) throw new Error('Category URL is undefined'); // Should never happen
    res.redirect(category.url)
  })
]

export const categoryUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const category = await Category.findById(req.params.id).exec()

  if (category === undefined) {
    debug(`Category with ID ${req.params.id} not found on update`)
    next(createError(404));
    return;
  }

  res.render('categoryForm', { create: false, category })
})

export const categoryUpdatePost = [
  // Validate and sanitize fields.
  body('name').trim().isLength({ min: 1 }).escape(),
  body('description').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      next(createError(400))
      return
    }

    const data = matchedData(req)
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: data.name, description: data.description },
      { new: true }
    )

    if (category === null || category.url === undefined) throw new Error('Category URL is undefined'); // Should never happen
    res.redirect(category.url);
  })
]

export const categoryDeletePost = asyncHandler(async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id).exec();
  res.redirect(303, '/categories/')
})
