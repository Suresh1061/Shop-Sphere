"use client";

import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { FC, useState } from "react";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const dataURLToBlob = (dataURL: string) => {
    return new Promise<Blob>((resolve, reject) => {
        const [header, base64Data] = dataURL.split(",");
        const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        resolve(new Blob([byteArray], { type: mime }));
    });
};

type props = {
    image: string;
    openModal: boolean;
    closedModal: () => void;
    getImageUrl: (url: string) => void;
};

export const CroppedImage: FC<props> = ({
    image,
    openModal,
    closedModal,
    getImageUrl,
}) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        try {
            setLoading(true);
            if (!canvas) return;
            const croppedImageDataUrl = canvas.toDataURL("image/jpeg");
            const blob = await dataURLToBlob(croppedImageDataUrl);
            const filename = `photo_${Date.now()}.jpg`;
            const storageRef = ref(storage, filename);
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            getImageUrl(downloadURL);
            closedModal();
        } catch (error) {
            console.log("Error while uploading", error);
            toast.error("Error uploading image");
        } finally {
            setLoading(false);
        }
    };

    const onChange = (cropper: CropperRef) => {
        setCanvas(cropper.getCanvas());
    };

    return (
        <>
            <Dialog open={openModal} onOpenChange={closedModal}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="font-medium text-muted-foreground text-center">Adjust image size</DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-full flex justify-center items-center">
                        <Cropper
                            src={image}
                            onChange={onChange}
                            className={"w-[350px] h-auto sm:w-[512px] sm:h-96"}
                        />
                    </div>
                    <div className=" w-full flex justify-end gap-8">
                        <Button
                            disabled={loading}
                            onClick={closedModal}
                            className="bg-red-600 hover:bg-red-500 w-28"
                        >Cancel</Button>
                        <Button
                            disabled={loading}
                            onClick={submit}
                            className="bg-green-600 hover:bg-green-500 w-28"
                        >
                            {loading ? "Uploading" : 'Upload'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
