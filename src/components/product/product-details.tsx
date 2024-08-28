import { productType } from "@/types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";

const ProductDetails: React.FC<productType & { setEditable: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    id,
    image,
    productName,
    productDescription,
    price,
    department,
    setEditable,
    stock
}) => {
    return (
        <div className="w-full max-w-6xl mx-auto" key={id}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="w-full flex justify-center items-start">
                    <div className=" max-w-[500px] max-h-[400px] aspect-[4/3]">
                        <Image
                            src={image}
                            alt="prducts"
                            width={500}
                            height={400}
                            className="object-cover w-full h-full  rounded-md"
                        />
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{productName}</h1>
                        <p className="text-muted-foreground text-base">{productDescription}</p>
                    </div>
                    <p className="text-sm font-medium">Category:
                        <span className="py-1 bg-blue-200 px-2 rounded-full ms-2">{department}</span>
                    </p>
                    <p className="text-sm font-medium">In Stock:
                        <span className="text-blue-600 ms-2">{stock ? stock : 0}</span>
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-primary font-semibold text-2xl">&#8377;{price}</span>
                        <Button size="lg" onClick={() => setEditable(true)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails