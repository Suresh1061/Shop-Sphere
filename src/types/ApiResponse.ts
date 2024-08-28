export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface ResponseStatus {
    error?: string;
    success?: string;
}