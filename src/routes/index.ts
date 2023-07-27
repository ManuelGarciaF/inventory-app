import { Router } from 'express';
import * as itemController from '../controllers/itemController';
import * as categoryController from '../controllers/categoryController';
import { Request, Response, NextFunction } from 'express';

const router = Router();

// Index page
router.get('/', (_, res: Response) => {
    res.render('index', { targetPage: "/items" });
});

/* Routes for items */

router.get('/items/', itemController.itemListGet);
router.get('/item/create', itemController.itemCreateGet);
router.post('/item/create', itemController.itemCreatePost);
router.get('/item/:id', itemController.itemDetailGet);
router.get('/item/:id/update', itemController.itemUpdateGet);
router.post('/item/:id/update', itemController.itemUpdatePost);
router.delete('/item/:id/delete', itemController.itemDeletePost);

/* Routes for categories */

router.get('/categories/', categoryController.categoryListGet);
router.get('/category/create', categoryController.categoryCreateGet);
router.post('/category/create', categoryController.categoryCreatePost);
router.get('/category/:id', categoryController.categoryDetailGet);
router.get('/category/:id/update', categoryController.categoryUpdateGet);
router.post('/category/:id/update', categoryController.categoryUpdatePost);
router.delete('/category/:id/delete', categoryController.categoryDeletePost);

export default router;
