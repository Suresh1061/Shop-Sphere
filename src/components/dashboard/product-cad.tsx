import { productType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"

export const ProductCard = ({
    id,
    image,
    productName,
    price,
    department,
    _id
}: productType) => {
    return (
        <Card key={id} className="max-w-xs rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl">
            <CardContent className="p-0">
                <Link href={`/product/${_id}`} prefetch={false}>
                    <div className=" w-full h-[240px] aspect-[4/3] p-4 pb-0">
                        <Image
                            src={image}
                            alt="prducts"
                            width={320}
                            height={240}
                            className="object-cover w-full h-full  rounded-md"
                        />
                    </div>
                    <div className="p-4 font-medium">
                        <h3 className="font-medium line-clamp-2 mb-2">{productName}</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-primary font-sans">&#8377;{price}</span>
                            <span className="text-xs  py-1 bg-blue-200 px-2 rounded-full">{department}</span>
                        </div>
                    </div>
                </Link>
            </CardContent>
        </Card>
    )
}
