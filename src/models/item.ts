import { Schema, model, Types } from 'mongoose';

export interface IItem {
    name: string;
    description: string;
    price: number;
    category: Types.ObjectId;
    inStock: number;
    url?: string;
}

const itemSchema = new Schema<IItem>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    inStock: { type: Number, default: 0 }
});

itemSchema.virtual('url').get(function () {
    return `item/${this._id}`;
})

export default model('Item', itemSchema);
