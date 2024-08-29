"use client";

import  Loading  from "@/components/loading";
import StartsCard from "@/components/profile/starts-card";
import UserInfo from "@/components/profile/user-info";
import { useUserDetailsQuery } from "@/store/baseApi";
import { useGetReviewProductsQuery } from "@/store/features/reviewFeature";
import { StartsCardType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";


const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserDetailsQuery({ id });
  const {
    data: reviews,
    isLoading: reviewLoading,
    isError: reviewIsError,
    error: reviewError,
  } = useGetReviewProductsQuery({ status: "pending" });

  useEffect(() => {
    if (isError || reviewIsError) {
      const errorMessage =
        (error as { data: { message: string } }) ||
        (reviewError as { data: { message: string } });
      // @ts-ignore
      toast.error(errorMessage ? errorMessage.data.message : reviewError?.data.message);
    }
  }, [isError, reviewIsError]);

  const user = data?.data;

  const startsList: StartsCardType[] = [
    {
      title:
        user?.role === "admin"
          ? "Total Pending Requests"
          : "Pending Requests",
      status: "pending",
      value:
        user?.role === "admin"
          ? reviews?.totalSize
          : user?.no_of_pending_reviews,
    },
    {
      title: user?.role === "admin" ? "Approved by me" : "Approved Requests",
      status: "approved",
      value: user?.no_of_approved_reviews,
    },
    {
      title: user?.role === "admin" ? "Rejected by me" : "Rejected Requests",
      status: "rejected",
      value: user?.no_of_rejected_reviews,
    },
  ];

  return (
    <section>
      {isLoading || reviewLoading ? (
        <Loading />
      ) : user && startsList && reviews ? (
        <div className="w-full max-w-lg mx-auto bg-background rounded-lg overflow-hidden">
          <UserInfo user={user} />
          <div className="grid grid-cols-3 gap-4 p-6">
            {startsList.map((item, i) => (
              <StartsCard
                key={i}
                user={user}
                title={item.title}
                status={item.status}
                value={item.value}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full py-60">
          <h1 className="text-2xl font-bold text-center text-muted-foreground">
            No user found
          </h1>
        </div>
      )}
    </section>
  );
};

export default Profile;
