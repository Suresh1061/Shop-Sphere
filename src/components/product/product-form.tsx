'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import InputField from '@/components/input-field';
import TextareaField from '@/components/textarea-field';
import ImageField from '@/components/image-field';
import { productType } from '@/types';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { getSession } from '@/app/lib';
import toast from 'react-hot-toast';
import Loading from '@/components/loading';
import { useUpdateProductMutation } from '@/store/features/productFeature';


interface ProductFormProps {
    product: productType;
    setEditable: (value: boolean) => void;
}

const ProductForm = ({ product, setEditable }: ProductFormProps) => {
    const router = useRouter();
    const [updateProduct, { isLoading, isError, error }] = useUpdateProductMutation();

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        mode: 'onSubmit',
        defaultValues: {
            id: product?.id || "",
            _id: product?._id || "",
            image: product?.image || "",
            productName: product?.productName || "",
            productDescription: product?.productDescription || "",
            price: product?.price || "",
            department: product?.department || "",
            stock: product?.stock || 0,
        }
    });

    useEffect(() => {
        if (isError) {
            const errorMsg = error as { data: { message: string } };
            toast.error(errorMsg.data.message);
            setEditable(false);
        }
    }, [isError]);

    const submitForm = async (data: z.infer<typeof productSchema>) => {
        const session = await getSession();
        if (!session) {
            toast.error('You need to be logged in to perform this action');
            return;
        }
        const res = await updateProduct({
            id: product?._id as string,
            product: data,
            user: session?.user,
        });
        if (res.data?.success) {
            toast.success(res.data.message);
            router.replace(`/profile/my-submissions?status=pending&user_id=${session?.user.id}`);
        }
    };

    return (
        <div className="max-w-5xl w-full mx-auto">
            <div className="p-5">
                {isLoading ? (
                    <Loading />
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-x-5">
                                <div className="w-full flex justify-center items-start mb-5">
                                    <ImageField name="image" form={form} />
                                </div>
                                <div className="space-y-3 w-full">
                                    <InputField
                                        name="productName"
                                        label="Product Name"
                                        placeholder="Enter product name"
                                        control={form.control}
                                    />
                                    <InputField
                                        name="department"
                                        label="Department"
                                        placeholder="Enter product department"
                                        control={form.control}
                                    />
                                    <InputField
                                        name="price"
                                        label="Product Price"
                                        placeholder="Enter product price"
                                        control={form.control}
                                    />
                                    <TextareaField
                                        name="productDescription"
                                        label="Product Description"
                                        placeholder="Enter product description"
                                        control={form.control}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-12">
                                <Button
                                    disabled={isLoading}
                                    variant={"outline"}
                                    type="button"
                                    className="w-full"
                                    onClick={() => setEditable(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full"
                                >
                                    Submit for approval
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default ProductForm;