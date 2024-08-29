'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from './ui/form';
import Image from 'next/image';
import { CroppedImage } from '@/utils/image-crop';

interface ImageFieldProps {
    name: string;
    form: any;
}

const ImageField = ({ name, form }: ImageFieldProps) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [openCropModal, setOpenCropModal] = useState(false);
    const [getCroppedUrl, setCroppedUrl] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const reader = new FileReader();
        try {
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(acceptedFiles[0]);
            setOpenCropModal(true);
        } catch (error) {
            setPreview(null);
            form.resetField(name);
        }
    }, [form, name]);

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 1000000, // 1MB limit
        accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    });

    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className="max-w-xs mx-auto">
                        <FormControl>
                            <div
                                {...getRootProps()}
                                className={` w-full h-[240px] aspect-[4/3] p-4 cursor-pointer flex flex-col items-center justify-center gap-y-2 rounded-md border border-slate-200 mt-2 ${isDragActive ? 'border-primary' : 'border-foreground'
                                    }`}
                            >
                                <Image
                                    src={field.value}
                                    alt="Uploaded image"
                                    width={320}
                                    height={240}
                                    className="object-cover w-full h-full  rounded-md"
                                />
                                <Input {...getInputProps()} type="file" hidden />
                                <p className=' text-xs text-center'>
                                    {isDragActive
                                        ? "Drop the image here..."
                                        : "Click here or drag a product image to upload"}
                                </p>
                            </div>
                        </FormControl>
                        <FormMessage>
                            {fileRejections.length !== 0 && (
                                <p>
                                    Image must be less than 1MB and of type PNG, JPG, or JPEG
                                </p>
                            )}
                        </FormMessage>
                    </FormItem>
                )}
            />
            <CroppedImage
                image={preview as string}
                openModal={openCropModal}
                closedModal={() => setOpenCropModal(false)}
                getImageUrl={(url) => {
                    setCroppedUrl(url);
                    form.setValue(name, url);
                    form.clearErrors(name);
                }}
            />
        </>
    );
};

export default ImageField
