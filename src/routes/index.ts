import { Router } from 'express';
import * as itemController from '../controllers/itemController';
import * as categoryController from '../controllers/categoryController';
import { Request, Response, NextFunction } from 'express';

const router = Router();

// Index page
router.get('/', (_, res: Response) => {
    res.render('index');
});

/* Routes for items */

router.get('/items/', itemController.itemListGet);
router.get('/item/create', itemController.itemCreateGet);
router.get('/item/create', itemController.itemCreatePost);
router.get('/item/:id', itemController.itemDetailGet);
router.get('/item/:id/update', itemController.itemUpdateGet);
router.get('/item/:id/update', itemController.itemUpdatePost);
router.get('/item/:id/delete', itemController.itemDeletePost);

/* Routes for categories */

router.get('/categories/', categoryController.categoryListGet);
router.get('/category/create', categoryController.categoryCreateGet);
router.get('/category/create', categoryController.categoryCreatePost);
router.get('/category/:id', categoryController.categoryDetailGet);
router.get('/category/:id/update', categoryController.categoryUpdateGet);
router.get('/category/:id/update', categoryController.categoryUpdatePost);
router.get('/category/:id/delete', categoryController.categoryDeletePost);

export default router;
