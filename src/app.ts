import * as createError from 'http-errors';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import indexRouter from './routes/index';

const app = express();

dotenv.config();

const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.e902pw3.mongodb.net/inventory_app?retryWrites=true&w=majority`

const main = async () => {
    await mongoose.connect(MONGO_URI);
};
main().catch(console.error);

// View engine setup.
app.set('views', path.resolve(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public')));

// Reload page with htmx when necessary
app.use((req: Request, res: Response, next: NextFunction) => {
    // If the request is made via HTMX proceed normally and send the html snippet.
    if (req.get("HX-Request") === "true") {
        next();
        return;
    }
    // If the request is made by going to the url normally render the response inside the index page.
    res.render("index", { targetPage: req.originalUrl });
})

app.use('/', indexRouter);

// Catch 404 and forward to error handler.
app.use(function (_req: Request, _res: Response, next: NextFunction) {
    next(createError(404));
});

// Error handler
app.use(function (err: Error & { status: number }, req: Request, res: Response, _next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', { error: err });
});

export default app;
