"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetReviewProductsQuery } from "@/store/features/reviewFeature";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
const PaginationButtons = dynamic(() => import("@/components/pagination-button"), { ssr: false });
const PendingRequestTable = dynamic(() => import("@/components/admin/pending-request-table"), { ssr: false });

const PendingRequests = () => {
  const [page, setPage] = useState(1);

  const {
    data: response,
    isError,
    isLoading,
    error,
  } = useGetReviewProductsQuery({ status: "pending" });

  useEffect(() => {
    if (isError) {
      const errorMessage = error as { data: { message: string } };
      toast.error(errorMessage.data.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loading />;


  return (
    <section className="max-w-screen-xl mx-auto rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-slate-700  mb-2 text-center">Pending requests</h1>
      <p className="text-gray-600 mb-6 text-center">Here are the list of all products thats are waiting for approval</p>
      {response ?
        <>
          <PendingRequestTable
            pendingRequests={response.data}
          />
          <PaginationButtons
            pageNumber={page}
            response={response}
            setPageNumber={(page) => setPage(page)}
          />
        </> :
        <div className="py-40 text-2xl text-muted-foreground text-center">
          <h1>There was no any pending requests</h1>
        </div>
      }
    </section>
  );
};

export default PendingRequests;
