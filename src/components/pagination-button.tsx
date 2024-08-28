import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { productResponseType } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationButtonsProps {
    pageNumber: number;
    response: productResponseType;
    className?: string;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationButtons = ({
    pageNumber,
    response,
    setPageNumber,
    className
}: PaginationButtonsProps) => {
    return (
        <div className={cn(
            className,
            "flex items-center justify-between my-6"
        )}>
            <p>
                Show {response.totalPages === 0 ? 0 : pageNumber} out of {response.totalPages}
            </p>
            <div className="flex items-center gap-6">
                <Button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber((prev) => prev - 1)}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Prev
                </Button>
                <Button
                    disabled={pageNumber >= response.totalPages}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                >
                    Next
                    <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
            </div>
        </div>
    )
}

export default PaginationButtons