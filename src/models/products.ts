import mongoose, { Schema } from 'mongoose'

export type productsSchema = {
    id: string;
    productName: string;
    price: string;
    stock: number;
    image: string;
    productDescription: string;
    department: string;
}

const productSchema = new Schema<productsSchema>({
    id: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

type productModalType = typeof productSchema;

const Products = mongoose.models.product || mongoose.model<productModalType>('product', productSchema);
export default Products;