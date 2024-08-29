"use client";

import { getSession } from "@/app/lib";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useGetProductDetailsQuery } from "@/store/features/productFeature";
import { useApproveProductReviewMutation, useGetReviewProductDetailsQuery } from "@/store/features/reviewFeature";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const PreviewProductCard = dynamic(() => import("@/components/preview-product-card"), { ssr: false });

const PendingRequestDetails = () => {
  const router = useRouter();
  const { request_id } = useParams<{ request_id: string }>();
  const { data, isLoading, isError, error } = useGetProductDetailsQuery({
    id: request_id,
  });

  const {
    data: reviewProductData,
    isLoading: reviewProductLoading,
    isError: isReviewProductError,
    error: reviewProductError,
  } = useGetReviewProductDetailsQuery({ id: request_id });

  const [
    updateProduct,
    {
      isLoading: updateProductLoading,
      isError: isUpdateProductError,
      error: updateProductError,
    },
  ] = useApproveProductReviewMutation();


  const handelUpdateProduct = async (status: 'approved' | 'rejected') => {
    const session = await getSession();
    if (!session) {
      toast.error("You need to be logged in to perform this action");
      return;
    }
    const response = await updateProduct({
      id: request_id,
      action: status,
      user: session?.user,
    });
    if (response?.data?.success) {
      toast.success("Product updated successfully");
      router.push('/dashboard')
    }
  };

  if (isLoading || reviewProductLoading || updateProductLoading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   if (isError || isReviewProductError || isUpdateProductError) {
  //     const errorMsg =
  //       (error as { data: { message: string } }) ||
  //       (reviewProductError as { data: { message: string } }) ||
  //       (updateProductError as { data: { message: string } });

  //     if (errorMsg && errorMsg.data && errorMsg.data.message) {
  //       toast.error(errorMsg.data.message);
  //     }
  //   }
  // }, [isError, isReviewProductError, isUpdateProductError])

  const originalProduct = data?.data;
  const reviewProduct = reviewProductData?.data;

  return (
    <section>
      <h1 className="text-center text-slate-700  text-2xl font-medium capitalize mb-6">
        Compare original product with under review product
      </h1>
      {originalProduct && reviewProduct ? (
        <div className=" max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-5 sm:gap-12 ">
            <div>
              <p className="text-center text-sm text-muted-foreground mb-2">
                Original Product
              </p>
              <PreviewProductCard {...originalProduct} />
            </div>
            <div>
              <p className="text-center text-sm text-muted-foreground mb-2">
                Under Review Product
              </p>
              <PreviewProductCard {...reviewProduct} />
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-x-8 mt-8">
            <Button
              className="w-full max-w-60 bg-red-600 hover:bg-red-500"
              onClick={() => handelUpdateProduct("rejected")}
            >
              Reject
            </Button>
            <Button
              className="w-full max-w-60 bg-green-600 hover:bg-green-500"
              onClick={() => handelUpdateProduct("approved")}
            >
              Approve
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full py-20">
          <h1 className="text-center text-2xl text-muted-foreground capitalize mb-4">
            No product found
          </h1>
        </div>
      )}
    </section>
  );
};

export default PendingRequestDetails;
