import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { reviewResponseType } from "@/types";

export const PreviewProductCard = ({
    productName,
    productDescription,
    price,
    image,
    department,
}: reviewResponseType) => {
    return (
        <Card className="max-w-xs rounded-lg overflow-hidden">
            <CardContent className="p-0">
                <div className=" w-full h-[240px] aspect-[4/3] p-4 pb-0">
                    <Image
                        src={image}
                        alt="prducts"
                        width={320}
                        height={240}
                        className="object-cover w-full h-full max-h-60 rounded-md"
                    />
                </div>
                <div className="p-4 text-card-foreground space-y-2">
                    <h2 className="text-xl font-semibold">{productName}</h2>
                    <p className="text-sm text-muted-foreground">{productDescription}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-primary font-sans">&#8377;{price}</span>
                        <span className="text-xs  py-1 bg-blue-200 px-2 rounded-full">{department}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
