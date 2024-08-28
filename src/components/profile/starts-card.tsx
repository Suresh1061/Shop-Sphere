import { StartsCardType, userType } from "@/types" 
import { useRouter } from "next/navigation";

type StartsCardProps = StartsCardType & { user: userType };

export const StartsCard = ({
    user,
    title,
    status,
    value,
    subtitle
}: StartsCardProps) => {
    const router = useRouter();

    const handleNavigate = () => {
        if (user.role === "team-member" && Number(value) > 0) {
            router.push(`/profile/my-submissions?status=${status}&user_id=${user._id}`)
        } else if (user.role === "admin" && status === "pending") {
            router.push(`/pending-requests`)
        }
    }
    return (
        <div className="bg-card rounded-lg p-4 flex flex-col gap-2 items-center cursor-pointer" onClick={handleNavigate}>
            <div className="text-4xl font-bold text-card-foreground">{value}</div>
            <div className="text-sm text-card-foreground font-medium text-center">{title}</div>
        </div>
    )
}
