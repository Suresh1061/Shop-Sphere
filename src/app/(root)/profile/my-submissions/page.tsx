"use client";

import { Loading } from "@/components/loading"
import { MySubmissionsTable } from "@/components/team-member/my-submissions-table"
import { useGetProductsUpdateByUserQuery } from "@/store/baseApi"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const MySubmissions = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const userId = searchParams.get("user_id") || "";

  const { data: reviews, isLoading, isError, error, refetch } =
    useGetProductsUpdateByUserQuery({ userId, reviewStatus: status })

  useEffect(() => {
    if (isError) {
      const errorMessage = error as { message: string };
      console.error(errorMessage.message);
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-screen-xl mx-auto bg-background rounded-lg overflow-hidden">
      <MySubmissionsTable
        reviewProducts={reviews.data}
      />
    </div>
  );
};

export default MySubmissions;
