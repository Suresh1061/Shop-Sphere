import mongoose, { Schema } from 'mongoose'

type userSchemaType = {
    email: string,
    password: string,
    role: 'admin' | 'team-member',
    no_of_pending_reviews: number,
    no_of_approved_reviews: number,
    no_of_rejected_reviews: number,
}

const userSchema = new Schema<userSchemaType>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'team-member'],
        default: 'team-member',
    },
    no_of_pending_reviews: {
        type: Number,
        default: 0,
    },
    no_of_approved_reviews: {
        type: Number,
        default: 0,
    },
    no_of_rejected_reviews: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

type userModalType = typeof userSchema;

const User = mongoose.models.user || mongoose.model<userModalType>('user', userSchema);
export default User;