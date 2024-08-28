"use client";

import ProductCard from "@/components/dashboard/product-card";
import { productType } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetAllProductsQuery } from "@/store/features/productFeature";
import dynamic from "next/dynamic";
const ProductCardSkeleton = dynamic(() => import("@/components/dashboard/product-card-skeleton"), { ssr: false });
const PaginationButtons = dynamic(() => import("@/components/pagination-button"), { ssr: false });

const Dashboard = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(12);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery({
    pageNumber,
    limit,
  });

  useEffect(() => {
    if (isError) {
      const errorMessage = error as { message: string };
      toast.error(errorMessage.message);
    }
  }, [isError, error]);

  if (isLoading) return <ProductCardSkeleton />

  return (
    <section>
      {response && response.data.length ? (
        <div>
          <div className="flex max-sm:flex-col items-center justify-between gap-5 mb-6">
          </div>
          <div className="grid max-sm:place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {response.data.map((product: productType) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <PaginationButtons
            pageNumber={pageNumber}
            response={response}
            setPageNumber={(page) => setPageNumber(page)}
          />
        </div>
      ) : (
        <div className="w-full py-60 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-center text-muted-foreground">No products found</h1>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
