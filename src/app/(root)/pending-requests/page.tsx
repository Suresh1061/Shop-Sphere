"use client";

import { useEffect, useState } from "react";
import { useGetReviewProductsQuery } from "@/store/baseApi";
import toast from "react-hot-toast";
import { Loading } from "@/components/loading";
import { JumpPage } from "@/components/jump-page";
import { PaginationButtons } from "@/components/pagination-button";
import { PendingRequestTable } from "@/components/admin/pending-request-table";

const PendingRequests = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const {
    data: response,
    isError,
    isLoading,
    error,
  } = useGetReviewProductsQuery({ status: "pending" });

  useEffect(() => {
    if (isError) {
      const errorMessage = error as { message: string };
      toast.error(errorMessage.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loading />;

  
  return (
    <section className="max-w-screen-xl mx-auto rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-slate-700  mb-2 text-center">Pending requests</h1>
      <p className="text-gray-600 mb-6 text-center">Here are the list of all products thats are waiting for approval</p>
      <div className="flex max-sm:flex-col items-center justify-between gap-5 mb-2">
        <JumpPage
          limit={limit}
          setLimit={() => setLimit(limit)}
          className=" order-2 sm:order-1"
        />
      </div>
      <PendingRequestTable
        pendingRequests={response.data}
      />
      <PaginationButtons
        pageNumber={page}
        response={response}
        setPageNumber={(page) => setPage(page)}
      />
    </section>
  );
};

export default PendingRequests;
