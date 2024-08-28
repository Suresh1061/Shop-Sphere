import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { userType } from "@/types"
import { User } from "lucide-react"

interface UserInfoProps{
  user: userType;
}

const UserInfo = ({user}:UserInfoProps) => {
  return (
    <div className="bg-primary p-6 flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarFallback><User className="w-10 h-10"/></AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="text-lg text-primary-foreground font-medium">{user.email}</div>
        <div className="text-sm text-gray-400">{user._id}</div>
        <span className="text-sm text-gray-200 ">{user.role == 'admin' ? "Admin" : "Team Member"}</span>
      </div>
    </div>
  )
}
export default UserInfo