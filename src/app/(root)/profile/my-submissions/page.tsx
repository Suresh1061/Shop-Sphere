"use client";

import  Loading  from "@/components/loading"
import MySubmissionsTable from "@/components/team-member/my-submissions-table"
import { useGetProductsUpdateByUserQuery } from "@/store/features/reviewFeature";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast";

const MySubmissions = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const userId = searchParams.get("user_id") || "";

  const { data: reviews, isLoading, isError, error } =
    useGetProductsUpdateByUserQuery({ userId, reviewStatus: status })

  useEffect(() => {
    if (isError) {
      const errorMessage = error as { data: { message: string } };
      toast.error(errorMessage.data.message);
    }
  }, [isError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-screen-xl mx-auto bg-background rounded-lg overflow-hidden">
      {
        reviews && (
          <MySubmissionsTable
            reviewProducts={reviews.data}
          />
        )
      }
    </div>
  );
};

export default MySubmissions;
