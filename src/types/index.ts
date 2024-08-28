export interface productType {
    id: string;
    image: string;
    productName: string;
    productDescription: string;
    price: string;
    department: string;
    stock?: number;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    className?: string;
    showDescription?:boolean;
}

export interface reviewResponseType extends productType {
    review_status: 'pending' | 'approved' | 'rejected';
    product_updated_author: string;
    product_updated_author_id: string;
}
export interface productResponseType {
    data: productType[];
    page: number;
    limit: number;
    totalPages: number;
    totalSize: number;
    message: string;
    success: boolean;
}

export interface apiResponse {
    data?: any;
    message: string;
    success: boolean;
}


export interface userType {
    email: string;
    password: string;
    role?: string;
    _id?: string;
    no_of_pending_reviews?: number;
    no_of_approved_reviews?: number;
    no_of_rejected_reviews?: number;
}

export interface StartsCardType {
    title: string;
    status: string;
    value: string | number;
    subtitle: string;
}

export interface pendingRequestsType {
    createdAt: string;
    department: string;
    id: string;
    image: string;
    price: string;
    productDescription: string;
    productName: string;
    product_updated_author: string;
    product_updated_author_id: string;
    review_status: string;
    stock: string;
    updatedAt: string;
    _id: string;
}
export interface mySubmissionsTableDataTypes {
    productId: string;
    productName: string;
    status: string;
    department: string;
}
