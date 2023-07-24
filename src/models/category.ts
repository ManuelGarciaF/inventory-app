import { Schema, model } from 'mongoose';

export interface ICategory {
    name: string;
    description: string;
    url?: string;
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

categorySchema.virtual('url').get(function () {
    return `/category/${this._id}`;
})

export default model('Category', categorySchema);
