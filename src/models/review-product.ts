import { productsSchema } from './products';
import mongoose, { Schema } from 'mongoose'

interface reviewSchemaType extends productsSchema {
    product_updated_author: string,
    product_updated_author_id: string,
    review_status: 'approved' | 'rejected' | 'pending',
}

const reviewSchema = new Schema<reviewSchemaType>({
    id: {
        type: String,
        required: true, 
    },
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    stock: {
        type: Number, 
    },
    product_updated_author: {
        type: String,
        required: true,
    },
    product_updated_author_id: {
        type: String,
        required: true,
    },
    review_status: {
        type: String,
        required: true,
        enum: ['approved', 'rejected', 'pending'],
        default: 'pending',
    }
}, {
    timestamps: true,
})

type reviewModel = typeof reviewSchema;

const ReviewProduct = mongoose.models.review || mongoose.model<reviewModel>('review', reviewSchema);
export default ReviewProduct;