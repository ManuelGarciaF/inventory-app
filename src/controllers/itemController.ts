import { body, validationResult, matchedData } from 'express-validator'
import * as createError from 'http-errors'
import * as asyncHandler from 'express-async-handler'
import * as debugModule from 'debug'
import Item from '../models/item'
import Category from '../models/category'
import { type Request, type Response, type NextFunction } from 'express'

const debug = debugModule('item');

export const itemListGet = asyncHandler(async (_, res: Response) => {
  const itemList = await Item.find({})
    .sort({ name: 'ascending' })
    .populate('category')
    .exec()

  res.render('itemList', { items: itemList })
})

export const itemDetailGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const item = await Item.findById(req.params.id).populate('category').exec()

  if (item === null) {
    const err = new Error('Item not found')
    res.status(404)
    next(err)
  }

  res.render('itemDetail', { item })
})

export const itemCreateGet = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({})
    .sort({ name: 'ascending' })
    .exec()

  res.render('itemForm', { categories, create: true, item: null })
})

export const itemCreatePost = [
  // Validate and sanitize fields.
  body('name').trim().isLength({ min: 1 }).escape(),
  body('description').trim().isLength({ min: 1 }).escape(),
  body('price').trim().isFloat({ gt: 0 }).toFloat(),
  body('category').escape(),
  body('inStock').optional({ values: 'falsy' }).isInt({ min: 0 }).toInt(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // If the form is somehow invalid, throw an error.
      next(createError(400, 'Invalid form data'))
      return
    }

    const data = matchedData(req)

    const item = new Item(data)
    await item.save()

    if (item.url === undefined) throw new Error('Item URL is undefined'); // Should never happen.
    res.redirect(item.url);
  })
]

export const itemUpdateGet = asyncHandler(async (req: Request, res: Response) => {
  const [item, categories] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find({})
      .sort({ name: 'ascending' })
      .exec()
  ])

  res.render('itemForm', { categories, create: false, item })
})

export const itemUpdatePost = [
  // Validate and sanitize fields.
  body('name').trim().isLength({ min: 1 }).escape(),
  body('description').trim().isLength({ min: 1 }).escape(),
  body('price').trim().isFloat({ gt: 0 }).toFloat(),
  body('category').escape(),
  body('inStock').optional({ values: 'falsy' }).isInt({ min: 0 }).toInt(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // If the form is somehow invalid, throw an error.
      debug(`Item with ID ${req.params.id} not found on update`)
      next(createError(400, 'Invalid form data'))
      return
    }

    const data = matchedData(req)
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    )

    if (item === null || item.url === undefined) throw new Error('Item URL is undefined'); // Should never happen.
    res.redirect(item.url);
  })
]
export const itemDeletePost = asyncHandler(async (req: Request, res: Response) => {
  await Item.findByIdAndDelete(req.params.id).exec();
  res.redirect(303, '/items/')
})
