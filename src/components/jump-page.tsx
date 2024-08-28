'use client'
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";


interface JumpPageProps {
    limit: number;
    className?: string;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const JumpPage = ({ limit, className, setLimit }: JumpPageProps) => {
    return (
        <div className={cn(
            className,
            "space-x-2 text-xs sm:text-base w-full float-left"
        )}>
            Show{" "}
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="px-2">
                    <Button variant="ghost" size={"sm"} className="ml-auto">
                        {limit} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {[8, 12, 16, 20].map((item) => (
                        <DropdownMenuItem key={item} onClick={() => setLimit(item)}>
                            {item}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>{" "}
            products
        </div>
    )
}
