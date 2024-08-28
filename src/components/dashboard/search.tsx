import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";


interface SearchProps {
    value: string;
    className?: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export const Search = ({
    value,
    setSearch,
    className
}: SearchProps) => {
    return (
        <div className={cn(
            className,
            "flex max-w-md items-center"
        )}>
            <Input
                type="search"
                value={value}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-60"
            />
            <Button className="flex ms-4 items-center">
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
            </Button>
        </div>
    )
}
