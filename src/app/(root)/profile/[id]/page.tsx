"use client";

import { Loading } from "@/components/loading"
import { StartsCard } from "@/components/profile/starts-card"
import { UserInfo } from "@/components/profile/user-info";
import { useGetReviewProductsQuery, useUserDetailsQuery } from "@/store/baseApi"
import { StartsCardType } from "@/types"
import { useParams } from "next/navigation"


const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserDetailsQuery({ id });
  const {
    data: reviews,
    isLoading: reviewLoading,
    isError: reviewIsError,
    error: reviewError,
  } = useGetReviewProductsQuery({ status: "pending" });

  const user = data?.data;

  const startsList: StartsCardType[] = [
    {
      title: "Pending Requests",
      status: "pending",
      value: user?.role === "admin" ? reviews?.totalSize : user?.no_of_pending_reviews,
      subtitle:
        user?.role === "admin"
          ? "Total pending requests"
          : "Total products under review",
    },
    {
      title: "Approved Requests",
      status: "approved",
      value: user?.no_of_approved_reviews,
      subtitle: user?.role === "admin" ? "Approved by me" : "Approved by admin",
    },
    {
      title: "Rejected Requests",
      status: "rejected",
      value: user?.no_of_rejected_reviews,
      subtitle: user?.role === "admin" ? "Rejected by me" : "Rejected by admin",
    },
  ];
  
  return (
    <section>
      {isLoading ? <Loading /> :
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
                subtitle={item.subtitle}
              />
            ))}
          </div>
        </div>
      }
    </section>
  );
};

export default Profile;
